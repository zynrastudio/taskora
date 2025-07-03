'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  CheckCircleIcon, 
  ClockIcon,
  PlusIcon,
  CalendarIcon,
  UserGroupIcon,
  TagIcon,
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  UserIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  HomeIcon,
  ChartBarIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'
import { TaskForm } from '@/components/TaskForm'
import { useAuth } from '@/hooks/useAuth'
import { useAppStore } from '@/stores/useAppStore'
import { Task } from '@/types'

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [taskModalOpen, setTaskModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [taskFormLoading, setTaskFormLoading] = useState(false)
  
  const { user, loading, signOut } = useAuth()
  const { 
    currentView, 
    setCurrentView, 
    getTasksByView, 
    getTaskStats, 
    addTask, 
    updateTask, 
    deleteTask, 
    toggleTaskStatus 
  } = useAppStore()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    }
  }, [user, loading, router])

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  const handleCreateTask = () => {
    setEditingTask(null)
    setTaskModalOpen(true)
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setTaskModalOpen(true)
  }

  const handleTaskSubmit = async (taskData: Partial<Task>) => {
    setTaskFormLoading(true)
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      if (editingTask) {
        updateTask(editingTask.id, taskData)
      } else {
        addTask(taskData as Omit<Task, 'id' | 'created_at' | 'updated_at' | 'user_id' | 'completion_rate'>)
      }
      
      setTaskModalOpen(false)
      setEditingTask(null)
    } catch (error) {
      console.error('Error saving task:', error)
    } finally {
      setTaskFormLoading(false)
    }
  }

  const handleDeleteTask = async (taskId: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      deleteTask(taskId)
    }
  }

  const formatDueDate = (dueDateString: string | undefined) => {
    if (!dueDateString) return 'No due date'
    
    const dueDate = new Date(dueDateString)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    if (dueDate.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (dueDate.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow'
    } else {
      return dueDate.toLocaleDateString()
    }
  }

  const tasks = getTasksByView()
  const stats = getTaskStats()

  const sidebarItems = [
    { id: 'today', label: 'Today', icon: HomeIcon, count: getTasksByView('today').length },
    { id: 'upcoming', label: 'Upcoming', icon: CalendarIcon, count: getTasksByView('upcoming').length },
    { id: 'all', label: 'All Tasks', icon: CheckCircleIcon, count: stats.total },
    { id: 'shared', label: 'Shared', icon: UserGroupIcon, count: getTasksByView('shared').length },
    { id: 'tags', label: 'Tags', icon: TagIcon },
    { id: 'analytics', label: 'Analytics', icon: ChartBarIcon }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  const TaskCard = ({ task }: { task: Task }) => (
    <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              task.priority === 'high' ? 'bg-red-500' :
              task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
            }`} />
            <CardTitle className="text-base group-hover:text-primary transition-colors">{task.title}</CardTitle>
          </div>
          <div className="flex items-center space-x-1">
            {task.status === 'completed' ? (
              <CheckCircleIcon className="w-5 h-5 text-green-500" />
            ) : (
              <ClockIcon className="w-5 h-5 text-blue-500" />
            )}
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground flex items-center">
            <CalendarIcon className="w-4 h-4 mr-1" />
            {formatDueDate(task.due_date)}
          </span>
          <div className="flex space-x-1">
            {task.tags.map((tag: string) => (
              <span key={tag} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded hover:bg-primary/20 transition-colors">
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        {/* Task Actions */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              toggleTaskStatus(task.id)
            }}
            className="text-xs hover:scale-110 transition-transform"
          >
            {task.status === 'completed' ? 'Mark Pending' : 'Complete'}
          </Button>
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                handleEditTask(task)
              }}
              className="w-8 h-8 hover:scale-110 transition-transform"
            >
              <PencilIcon className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                handleDeleteTask(task.id)
              }}
              className="w-8 h-8 hover:scale-110 transition-transform hover:text-destructive"
            >
              <TrashIcon className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-border">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <CheckCircleIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">Taskora</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <XMarkIcon className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6">
          <Button 
            className="w-full mb-6 hover:scale-105 transition-transform"
            onClick={handleCreateTask}
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Task
          </Button>

          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id as any)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 text-left hover:bg-muted group ${
                  currentView === item.id ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <item.icon className={`w-5 h-5 group-hover:scale-110 transition-transform ${
                  currentView === item.id ? 'text-primary' : ''
                }`} />
                <span className="flex-1">{item.label}</span>
                {item.count && (
                  <span className={`px-2 py-1 rounded text-xs ${
                    currentView === item.id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* User Profile Section */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="flex-1 hover:scale-105 transition-transform">
              <Cog6ToothIcon className="w-4 h-4 mr-1" />
              Settings
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSignOut}
              className="hover:scale-105 transition-transform hover:text-destructive hover:border-destructive"
            >
              <ArrowRightOnRectangleIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Top Bar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden hover:scale-110 transition-transform"
            >
              <Bars3Icon className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-foreground capitalize">
                {currentView === 'today' ? 'Today\'s Tasks' : 
                 currentView === 'upcoming' ? 'Upcoming Tasks' :
                 currentView === 'all' ? 'All Tasks' :
                 currentView === 'shared' ? 'Shared Tasks' :
                 currentView === 'tags' ? 'Tags' :
                 currentView === 'analytics' ? 'Analytics' : 'Dashboard'}
              </h1>
              <p className="text-sm text-muted-foreground">
                {currentView === 'today' ? 'Focus on what\'s due today' :
                 'Manage your tasks efficiently'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative hover:scale-110 transition-transform">
              <BellIcon className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CheckCircleIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                    <p className="text-sm text-muted-foreground">Total Tasks</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircleIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stats.completed}</p>
                    <p className="text-sm text-muted-foreground">Completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <ClockIcon className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stats.pending}</p>
                    <p className="text-sm text-muted-foreground">Pending</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <ChartBarIcon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stats.completionRate}%</p>
                    <p className="text-sm text-muted-foreground">Progress</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tasks List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  {currentView === 'today' ? 'Today\'s Tasks' : 
                   currentView === 'upcoming' ? 'Upcoming Tasks' :
                   currentView === 'all' ? 'All Tasks' :
                   currentView === 'shared' ? 'Shared Tasks' :
                   currentView === 'tags' ? 'Tagged Tasks' :
                   currentView === 'analytics' ? 'Analytics View' : 'Recent Tasks'}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {tasks.length === 0 ? 'No tasks found' :
                   tasks.length === 1 ? '1 task' :
                   `${tasks.length} tasks`}
                </p>
              </div>
              <Button 
                variant="outline" 
                className="hover:scale-105 transition-transform"
                onClick={handleCreateTask}
              >
                Add Task
              </Button>
            </div>
            
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircleIcon className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">No tasks found</h3>
                <p className="text-muted-foreground mb-4">
                  {currentView === 'today' ? 'No tasks are due today. Great job staying on top of things!' :
                   currentView === 'upcoming' ? 'No upcoming tasks scheduled.' :
                   currentView === 'completed' ? 'No completed tasks yet.' :
                   'Get started by creating your first task.'}
                </p>
                <Button onClick={handleCreateTask} className="hover:scale-105 transition-transform">
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Create Your First Task
                </Button>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="mt-8 p-6 bg-gradient-to-r from-primary/5 to-blue-500/5 rounded-xl border border-primary/20">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                className="h-auto p-4 flex-col space-y-2 hover:scale-105 transition-transform"
                onClick={handleCreateTask}
              >
                <PlusIcon className="w-6 h-6" />
                <span>Create Task</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 flex-col space-y-2 hover:scale-105 transition-transform"
                onClick={() => alert('Team collaboration features coming soon!')}
              >
                <UserGroupIcon className="w-6 h-6" />
                <span>Invite Team</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 flex-col space-y-2 hover:scale-105 transition-transform"
                onClick={() => setCurrentView('analytics')}
              >
                <ChartBarIcon className="w-6 h-6" />
                <span>View Reports</span>
              </Button>
            </div>
          </div>
        </main>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Task Modal */}
      <Modal
        isOpen={taskModalOpen}
        onClose={() => {
          setTaskModalOpen(false)
          setEditingTask(null)
        }}
        title={editingTask ? 'Edit Task' : 'Create New Task'}
      >
        <TaskForm
          task={editingTask || undefined}
          onSubmit={handleTaskSubmit}
          onCancel={() => {
            setTaskModalOpen(false)
            setEditingTask(null)
          }}
          loading={taskFormLoading}
        />
      </Modal>
    </div>
  )
} 