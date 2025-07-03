import { create } from 'zustand'
import { Task, User, TaskStatus, TaskPriority } from '@/types'

interface AppState {
  // User state
  user: User | null
  setUser: (user: User | null) => void
  
  // UI state
  currentView: 'today' | 'upcoming' | 'all' | 'shared' | 'tags' | 'analytics'
  setCurrentView: (view: 'today' | 'upcoming' | 'all' | 'shared' | 'tags' | 'analytics') => void
  
  // Task state
  tasks: Task[]
  loading: boolean
  setTasks: (tasks: Task[]) => void
  addTask: (task: Omit<Task, 'id' | 'created_at' | 'updated_at' | 'user_id' | 'completion_rate'>) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  toggleTaskStatus: (id: string) => void
  
  // Filtering and search
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedTags: string[]
  setSelectedTags: (tags: string[]) => void
  
  // Stats
  getTaskStats: () => {
    total: number
    completed: number
    pending: number
    overdue: number
    completionRate: number
  }
  
  // View-specific task filtering
  getTasksByView: (view?: string) => Task[]
}

const generateId = () => Math.random().toString(36).substr(2, 9)

const isToday = (dateString: string) => {
  const today = new Date().toDateString()
  const taskDate = new Date(dateString).toDateString()
  return today === taskDate
}

const isUpcoming = (dateString: string) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const taskDate = new Date(dateString)
  taskDate.setHours(0, 0, 0, 0)
  return taskDate > today
}

const isOverdue = (dateString: string) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const taskDate = new Date(dateString)
  taskDate.setHours(0, 0, 0, 0)
  return taskDate < today
}

export const useAppStore = create<AppState>((set, get) => ({
  // User state
  user: null,
  setUser: (user) => set({ user }),
  
  // UI state
  currentView: 'today',
  setCurrentView: (view) => set({ currentView: view }),
  
  // Task state
  tasks: [
    // Demo tasks for development
    {
      id: '1',
      title: 'Complete project proposal',
      description: 'Finalize the Q2 project proposal for client review',
      status: 'pending' as TaskStatus,
      priority: 'high' as TaskPriority,
      due_date: new Date().toISOString().split('T')[0], // Today
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_id: 'demo-user',
      tags: ['Work', 'Important'],
      is_recurring: false,
      completion_rate: 0
    },
    {
      id: '2',
      title: 'Team standup meeting',
      description: 'Daily standup with the development team',
      status: 'pending' as TaskStatus,
      priority: 'medium' as TaskPriority,
      due_date: new Date().toISOString().split('T')[0], // Today
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_id: 'demo-user',
      tags: ['Meeting'],
      is_recurring: true,
      recurring_pattern: 'daily',
      completion_rate: 0
    },
    {
      id: '3',
      title: 'Review code changes',
      description: 'Review pull requests from team members',
      status: 'completed' as TaskStatus,
      priority: 'medium' as TaskPriority,
      due_date: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_id: 'demo-user',
      tags: ['Development'],
      is_recurring: false,
      completion_rate: 100
    },
    {
      id: '4',
      title: 'Plan vacation trip',
      description: 'Research and book summer vacation',
      status: 'pending' as TaskStatus,
      priority: 'low' as TaskPriority,
      due_date: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0], // Next week
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_id: 'demo-user',
      tags: ['Personal'],
      is_recurring: false,
      completion_rate: 0
    }
  ],
  loading: false,
  
  setTasks: (tasks) => set({ tasks }),
  
  addTask: (taskData) => {
    const newTask: Task = {
      ...taskData,
      id: generateId(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_id: get().user?.id || 'demo-user',
      completion_rate: 0
    }
    
    set((state) => ({
      tasks: [...state.tasks, newTask]
    }))
  },
  
  updateTask: (id, updates) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? { ...task, ...updates, updated_at: new Date().toISOString() }
          : task
      )
    }))
  },
  
  deleteTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id)
    }))
  },
  
  toggleTaskStatus: (id) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === 'completed' ? 'pending' : 'completed',
              completion_rate: task.status === 'completed' ? 0 : 100,
              updated_at: new Date().toISOString()
            }
          : task
      )
    }))
  },
  
  // Search and filtering
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  selectedTags: [],
  setSelectedTags: (tags) => set({ selectedTags: tags }),
  
  // Stats calculation
  getTaskStats: () => {
    const { tasks } = get()
    const total = tasks.length
    const completed = tasks.filter(task => task.status === 'completed').length
    const pending = tasks.filter(task => task.status === 'pending').length
    const overdue = tasks.filter(task => 
      task.status === 'pending' && 
      task.due_date && 
      isOverdue(task.due_date)
    ).length
    
    return {
      total,
      completed,
      pending,
      overdue,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
    }
  },
  
  // View-specific filtering
  getTasksByView: (view?: string) => {
    const { tasks, currentView, searchQuery, selectedTags } = get()
    const viewToUse = view || currentView
    
    let filteredTasks = tasks
    
    // Filter by view
    switch (viewToUse) {
      case 'today':
        filteredTasks = tasks.filter(task => 
          task.due_date && isToday(task.due_date)
        )
        break
      case 'upcoming':
        filteredTasks = tasks.filter(task => 
          task.due_date && isUpcoming(task.due_date)
        )
        break
      case 'shared':
        // In a real app, this would filter by shared tasks
        filteredTasks = tasks.filter(task => 
          task.tags.includes('Work') || task.tags.includes('Meeting')
        )
        break
      case 'all':
      default:
        filteredTasks = tasks
        break
    }
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filteredTasks = filteredTasks.filter(task =>
        task.title.toLowerCase().includes(query) ||
        task.description?.toLowerCase().includes(query) ||
        task.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }
    
    // Apply tag filter
    if (selectedTags.length > 0) {
      filteredTasks = filteredTasks.filter(task =>
        task.tags.some(tag => selectedTags.includes(tag))
      )
    }
    
    // Sort by priority and due date
    return filteredTasks.sort((a, b) => {
      // First sort by status (pending first)
      if (a.status !== b.status) {
        if (a.status === 'pending') return -1
        if (b.status === 'pending') return 1
      }
      
      // Then by priority
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority]
      if (priorityDiff !== 0) return priorityDiff
      
      // Finally by due date
      if (a.due_date && b.due_date) {
        return new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
      }
      if (a.due_date) return -1
      if (b.due_date) return 1
      
      return 0
    })
  }
})) 