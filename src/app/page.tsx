import Link from "next/link";
import { 
  CheckCircleIcon, 
  UsersIcon, 
  BellIcon, 
  CalendarIcon,
  TagIcon,
  ChartBarIcon,
  MoonIcon,
  SunIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <CheckCircleIcon className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-foreground">Taskora</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link 
            href="/auth/login" 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Sign In
          </Link>
          <Link 
            href="/auth/signup"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            Organize your life with
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Taskora</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            A modern, collaborative, and beautifully designed task manager built for everyday productivity. 
            Manage tasks, collaborate with teams, and stay organized with style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auth/signup"
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Start organizing today</span>
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
            <Link 
              href="/demo"
              className="border border-border text-foreground px-8 py-3 rounded-lg font-semibold hover:bg-muted transition-colors"
            >
              View Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 lg:px-8 py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Everything you need to stay productive
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to help you organize, collaborate, and achieve more.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Task Management */}
            <div className="bg-background p-6 rounded-xl shadow-sm border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <CheckCircleIcon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Smart Task Management</h3>
              <p className="text-muted-foreground">
                Create, organize, and track tasks with subtasks, priorities, deadlines, and recurring patterns.
              </p>
            </div>

            {/* Collaboration */}
            <div className="bg-background p-6 rounded-xl shadow-sm border border-border">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
                <UsersIcon className="w-6 h-6 text-success" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Team Collaboration</h3>
              <p className="text-muted-foreground">
                Share tasks, assign roles, leave comments, and collaborate in real-time with your team.
              </p>
            </div>

            {/* Notifications */}
            <div className="bg-background p-6 rounded-xl shadow-sm border border-border">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mb-4">
                <BellIcon className="w-6 h-6 text-warning" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Smart Notifications</h3>
              <p className="text-muted-foreground">
                Get reminded about due tasks, collaboration updates, and never miss important deadlines.
              </p>
            </div>

            {/* Calendar View */}
            <div className="bg-background p-6 rounded-xl shadow-sm border border-border">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                <CalendarIcon className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Multiple Views</h3>
              <p className="text-muted-foreground">
                Switch between Today, Upcoming, Calendar, and All Tasks views to stay organized.
              </p>
            </div>

            {/* Tags & Organization */}
            <div className="bg-background p-6 rounded-xl shadow-sm border border-border">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                <TagIcon className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Tags & Folders</h3>
              <p className="text-muted-foreground">
                Organize tasks with custom tags, folders, and powerful filtering options.
              </p>
            </div>

            {/* Analytics */}
            <div className="bg-background p-6 rounded-xl shadow-sm border border-border">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4">
                <ChartBarIcon className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Progress Analytics</h3>
              <p className="text-muted-foreground">
                Track your productivity with completion rates, streaks, and insightful statistics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              How Taskora works
            </h2>
            <p className="text-lg text-muted-foreground">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Create Your Tasks</h3>
              <p className="text-muted-foreground">
                Add tasks with descriptions, deadlines, priorities, and organize them into folders.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Collaborate & Share</h3>
              <p className="text-muted-foreground">
                Invite team members, assign roles, and work together on shared projects.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Track Progress</h3>
              <p className="text-muted-foreground">
                Monitor your productivity, complete tasks, and celebrate your achievements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 lg:px-8 py-16 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Ready to boost your productivity?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of users who are already organizing their life with Taskora.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auth/signup"
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Get Started for Free
            </Link>
            <Link 
              href="/contact"
              className="text-muted-foreground hover:text-foreground transition-colors px-8 py-3"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                  <CheckCircleIcon className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-foreground">Taskora</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Modern task management for productive teams.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-3">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/features" className="hover:text-foreground transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
                <li><Link href="/demo" className="hover:text-foreground transition-colors">Demo</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-3">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
                <li><Link href="/careers" className="hover:text-foreground transition-colors">Careers</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-3">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/help" className="hover:text-foreground transition-colors">Help Center</Link></li>
                <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Taskora. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
