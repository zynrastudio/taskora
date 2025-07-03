import Link from 'next/link'
import { 
  CheckCircleIcon, 
  ClockIcon, 
  XMarkIcon, 
  PlusIcon,
  CalendarIcon,
  UserGroupIcon,
  TagIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

export default function DemoPage() {
  const demoTasks = [
    {
      id: 1,
      title: "Design new landing page",
      description: "Create a modern, responsive landing page for the new product launch",
      status: "pending",
      priority: "high",
      dueDate: "Today",
      tags: ["Design", "Frontend"],
      subtasks: [
        { title: "Create wireframes", status: "completed" },
        { title: "Design mockups", status: "pending" },
        { title: "Get feedback", status: "pending" }
      ]
    },
    {
      id: 2,
      title: "Update documentation",
      description: "Review and update API documentation for v2.0",
      status: "completed",
      priority: "medium",
      dueDate: "Yesterday",
      tags: ["Documentation"],
      subtasks: [
        { title: "Review existing docs", status: "completed" },
        { title: "Add new endpoints", status: "completed" }
      ]
    },
    {
      id: 3,
      title: "Team meeting",
      description: "Weekly team sync to discuss project progress",
      status: "pending",
      priority: "low",
      dueDate: "Tomorrow",
      tags: ["Meeting"],
      subtasks: []
    }
  ]

  const TaskCard = ({ task }: { task: any }) => (
    <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              task.priority === 'high' ? 'bg-red-500' :
              task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
            }`} />
            <CardTitle className="text-base">{task.title}</CardTitle>
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
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-muted-foreground flex items-center">
            <CalendarIcon className="w-4 h-4 mr-1" />
            {task.dueDate}
          </span>
          <div className="flex space-x-1">
            {task.tags.map((tag: string) => (
              <span key={tag} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
        {task.subtasks.length > 0 && (
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Subtasks:</p>
            {task.subtasks.map((subtask: any, index: number) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                {subtask.status === 'completed' ? (
                  <CheckCircleIcon className="w-4 h-4 text-green-500" />
                ) : (
                  <ClockIcon className="w-4 h-4 text-muted-foreground" />
                )}
                <span className={subtask.status === 'completed' ? 'line-through text-muted-foreground' : ''}>
                  {subtask.title}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 group">
              <ArrowLeftIcon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">Taskora Demo</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/login">
                <Button variant="outline" size="sm">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Experience Taskora in Action
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore how Taskora helps you organize tasks, collaborate with teams, and boost productivity.
            This is a live preview of the actual interface you'll use.
          </p>
        </div>

        {/* Demo Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="text-lg">Dashboard</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3 p-2 bg-primary/10 rounded-lg">
                  <CheckCircleIcon className="w-5 h-5 text-primary" />
                  <span className="font-medium text-primary">Today</span>
                  <span className="ml-auto bg-primary text-primary-foreground px-2 py-1 rounded text-xs">2</span>
                </div>
                <div className="flex items-center space-x-3 p-2 hover:bg-muted rounded-lg transition-colors cursor-pointer">
                  <CalendarIcon className="w-5 h-5 text-muted-foreground" />
                  <span>Upcoming</span>
                  <span className="ml-auto bg-muted text-muted-foreground px-2 py-1 rounded text-xs">1</span>
                </div>
                <div className="flex items-center space-x-3 p-2 hover:bg-muted rounded-lg transition-colors cursor-pointer">
                  <UserGroupIcon className="w-5 h-5 text-muted-foreground" />
                  <span>Shared</span>
                </div>
                <div className="flex items-center space-x-3 p-2 hover:bg-muted rounded-lg transition-colors cursor-pointer">
                  <TagIcon className="w-5 h-5 text-muted-foreground" />
                  <span>Tags</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Today's Tasks</h2>
                <p className="text-muted-foreground">You have 2 tasks due today</p>
              </div>
              <Button className="hover:scale-105 transition-transform">
                <PlusIcon className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </div>

            {/* Tasks Grid */}
            <div className="space-y-4">
              {demoTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-green-500">75%</div>
                  <div className="text-sm text-muted-foreground">Completion Rate</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-blue-500">12</div>
                  <div className="text-sm text-muted-foreground">Tasks Completed</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-orange-500">5</div>
                  <div className="text-sm text-muted-foreground">Day Streak</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 p-8 bg-primary/5 rounded-2xl">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to start organizing your tasks?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Sign up now and get access to all features. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="hover:scale-105 transition-transform">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="outline" size="lg" className="hover:scale-105 transition-transform">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 