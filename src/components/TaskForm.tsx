import { useState } from 'react'
import { CalendarIcon, TagIcon, FlagIcon } from '@heroicons/react/24/outline'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { Task } from '@/types'

interface TaskFormProps {
  task?: Task
  onSubmit: (taskData: Partial<Task>) => void
  onCancel: () => void
  loading?: boolean
}

export const TaskForm = ({ task, onSubmit, onCancel, loading = false }: TaskFormProps) => {
  const [title, setTitle] = useState(task?.title || '')
  const [description, setDescription] = useState(task?.description || '')
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(task?.priority || 'medium')
  const [dueDate, setDueDate] = useState(task?.due_date || '')
  const [tags, setTags] = useState(task?.tags?.join(', ') || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const taskData: Partial<Task> = {
      title: title.trim(),
      description: description.trim(),
      priority,
      due_date: dueDate || undefined,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
      status: task?.status || 'pending'
    }

    if (task) {
      taskData.id = task.id
    }

    onSubmit(taskData)
  }

  const priorityColors = {
    low: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-red-100 text-red-800 border-red-200'
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
          Task Title
        </label>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          required
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description (optional)"
          rows={3}
          className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-foreground mb-2">
            <FlagIcon className="w-4 h-4 inline mr-1" />
            Priority
          </label>
          <div className="flex space-x-2">
            {(['low', 'medium', 'high'] as const).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setPriority(level)}
                className={`px-3 py-2 text-sm rounded-md border transition-all duration-200 hover:scale-105 ${
                  priority === level 
                    ? priorityColors[level]
                    : 'bg-muted text-muted-foreground border-border hover:border-primary/50'
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-foreground mb-2">
            <CalendarIcon className="w-4 h-4 inline mr-1" />
            Due Date
          </label>
          <Input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-foreground mb-2">
          <TagIcon className="w-4 h-4 inline mr-1" />
          Tags
        </label>
        <Input
          id="tags"
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Enter tags separated by commas (e.g., work, urgent, meeting)"
          className="w-full"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Separate multiple tags with commas
        </p>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-border">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading || !title.trim()}
          className="hover:scale-105 transition-transform"
        >
          {loading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>{task ? 'Updating...' : 'Creating...'}</span>
            </div>
          ) : (
            task ? 'Update Task' : 'Create Task'
          )}
        </Button>
      </div>
    </form>
  )
} 