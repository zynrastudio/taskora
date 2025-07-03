export type TaskStatus = 'pending' | 'completed' | 'cancelled'
export type TaskPriority = 'low' | 'medium' | 'high'
export type UserRole = 'owner' | 'editor' | 'viewer'

export interface User {
  id: string
  email: string
  name: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  due_date?: string
  created_at: string
  updated_at: string
  user_id: string
  folder_id?: string
  tags: string[]
  is_recurring: boolean
  recurring_pattern?: 'daily' | 'weekly' | 'custom'
  completion_rate: number
}

export interface Subtask {
  id: string
  task_id: string
  title: string
  status: TaskStatus
  due_date?: string
  assigned_user_id?: string
  created_at: string
  updated_at: string
}

export interface Folder {
  id: string
  name: string
  color: string
  user_id: string
  created_at: string
  updated_at: string
}

export interface TaskCollaborator {
  id: string
  task_id: string
  user_id: string
  role: UserRole
  invited_at: string
  accepted_at?: string
}

export interface Comment {
  id: string
  task_id: string
  user_id: string
  content: string
  created_at: string
  updated_at: string
}

export interface Notification {
  id: string
  user_id: string
  type: 'task_assigned' | 'task_due' | 'comment_added' | 'subtask_completed'
  title: string
  message: string
  read: boolean
  created_at: string
  task_id?: string
}

export interface TaskFilter {
  status?: TaskStatus[]
  priority?: TaskPriority[]
  tags?: string[]
  folder_id?: string
  assigned_to?: string
  due_date_range?: {
    start: string
    end: string
  }
}

export interface TaskStats {
  total_tasks: number
  completed_tasks: number
  pending_tasks: number
  overdue_tasks: number
  completion_rate: number
  streak_days: number
} 