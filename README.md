# Taskora - Modern Task Management

A modern, collaborative, and beautifully designed task manager built for everyday productivity.

![Taskora Logo](https://via.placeholder.com/120x40/3B82F6/FFFFFF?text=Taskora)

## 🚀 Overview

Taskora is a professional, web-based task management platform designed to help users organize their daily lives. It combines simple task creation with rich features like subtasks, collaboration, real-time updates, customizable reminders, and dual-theme support — all within a sleek and minimal UI.

## ✨ Features

### 🔐 Authentication & Security
- [x] Email & Password authentication setup
- [ ] Social Login (Google, Apple)
- [ ] Password reset & email verification
- [x] Supabase integration configured

### 👤 User Profile
- [ ] Customizable profile (name, avatar, email)
- [ ] Task statistics and history
- [ ] Notification preferences
- [ ] Account settings

### ✅ Task Management
- [ ] Create, edit, delete tasks
- [ ] Task priorities (Low / Medium / High)
- [ ] Due dates and deadlines
- [ ] Recurring tasks (daily / weekly / custom)
- [ ] Tags and folders organization
- [ ] Drag & drop reordering

### 🪜 Subtasks with Status
- [ ] Multiple subtasks per task
- [ ] Subtask status tracking (✅ Completed | 🕒 Pending | ❌ Canceled)
- [ ] Assigned users for collaborative tasks
- [ ] Visual progress tracking

### 👥 Collaboration
- [ ] Share tasks with team members
- [ ] Role-based permissions (Owner / Editor / Viewer)
- [ ] Comments and discussions
- [ ] Real-time updates
- [ ] Activity feed

### 🗓️ Task Views
- [ ] Today View (tasks due today)
- [ ] Upcoming View (next 7 days)
- [ ] All Tasks View
- [ ] Calendar View (monthly layout)
- [ ] Advanced filtering and sorting

### 🛎️ Notifications
- [ ] Email alerts (daily summary, due soon)
- [ ] In-app notifications
- [ ] Task reminders
- [ ] Collaboration updates

### 🌙 Theme & Design
- [x] Light/Dark mode support
- [x] Modern, accessible UI components
- [x] Responsive design
- [x] Beautiful animations and transitions

### 🔍 Additional Features
- [ ] Global search
- [ ] Task templates
- [ ] Analytics dashboard
- [ ] Archive functionality
- [ ] Bulk operations

## 🛠️ Tech Stack

- **Frontend**: Next.js 15.3.4 with React 19
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **State Management**: Zustand
- **UI Components**: Custom components with Radix UI primitives
- **Icons**: Heroicons
- **Date Handling**: date-fns
- **Form Handling**: react-hook-form

## 📦 Project Structure

```
taskora/
├── doc/
│   └── prd/
│       └── taskora-prd.md          # Product Requirements Document
├── src/
│   ├── app/                        # Next.js app directory
│   │   ├── globals.css            # Global styles and theme
│   │   ├── layout.tsx             # Root layout
│   │   └── page.tsx               # Landing page
│   ├── components/                 # Reusable UI components
│   │   └── ui/                    # Base UI components
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── Input.tsx
│   ├── hooks/                     # Custom React hooks
│   │   └── useAuth.ts            # Authentication hook
│   ├── lib/                      # Library configurations
│   │   └── supabase.ts           # Supabase client setup
│   ├── stores/                   # Zustand state stores
│   │   └── useAppStore.ts        # Global app state
│   ├── types/                    # TypeScript type definitions
│   │   └── index.ts              # Core types (Task, User, etc.)
│   └── utils/                    # Utility functions
│       ├── cn.ts                 # Class name utility
│       └── date.ts               # Date formatting utilities
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd taskora
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase Database**
   - Create a new Supabase project
   - Run the database migrations (coming soon)
   - Configure authentication settings

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6)
- **Success**: Green (#22C55E)
- **Warning**: Amber (#F59E0B)
- **Destructive**: Red (#EF4444)

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Font weights 600-700
- **Body**: Font weight 400

### Components
- Modern, accessible UI components
- Consistent spacing and border radius
- Smooth transitions and animations
- Support for both light and dark themes

## 📱 Screenshots

### Landing Page
- Hero section with gradient background
- Feature showcase with icons
- How it works section
- Call-to-action sections
- Professional footer

### Upcoming Pages
- Authentication forms (Sign In/Sign Up)
- Main dashboard with sidebar navigation
- Task management interface
- Calendar view
- User profile settings

## 🔧 Development Progress

### Phase 1: Foundation ✅
- [x] Project setup with Next.js and TypeScript
- [x] Tailwind CSS configuration
- [x] Supabase integration
- [x] Core type definitions
- [x] Global state management with Zustand
- [x] Base UI components
- [x] Landing page design
- [x] Authentication hook structure

### Phase 2: Authentication (In Progress)
- [ ] Sign up/Sign in forms
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Protected routes

### Phase 3: Core Task Management
- [ ] Task creation and editing
- [ ] Subtasks functionality
- [ ] Priority and status management
- [ ] Due dates and reminders

### Phase 4: Collaboration Features
- [ ] User invitations
- [ ] Role-based permissions
- [ ] Comments and activity feeds
- [ ] Real-time updates

### Phase 5: Advanced Features
- [ ] Calendar view
- [ ] Analytics dashboard
- [ ] Search functionality
- [ ] Bulk operations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email support@taskora.com or join our Discord community.

---

**Built with ❤️ by the Taskora team**
