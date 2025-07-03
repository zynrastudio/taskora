# Taskora - Product Requirements Document

**Product Name:** Taskora  
*A modern, collaborative, and beautifully designed task manager built for everyday productivity.*

## 1. Overview
Taskora is a professional, web-based task management platform designed to help users organize their daily lives. It combines simple task creation with rich features like subtasks, collaboration, real-time updates, customizable reminders, and dual-theme support — all within a sleek and minimal UI.

## 2. Goals & Objectives
- Empower users to organize their daily tasks and subtasks efficiently
- Facilitate collaboration on shared task lists
- Provide secure user authentication and privacy
- Deliver visual clarity through a modern, accessible interface
- Offer responsive, reliable task tracking from any device

## 3. Target Audience
- **Students** (academic and personal organization)
- **Professionals** (individual task tracking and team collaboration)
- **Teams** (small to medium-scale project collaboration)
- **Solo users** (personal productivity and habit tracking)

## 4. Core Features

### 🔐 Authentication & Security
- Sign Up / Login with Email & Password
- Social Login (Google, Apple – optional)
- Secure password reset & email verification
- End-to-end data encryption (via Supabase/Auth service)

### 👤 User Profile
- Customizable profile: name, avatar, email
- View task statistics, history, and collaboration activity
- Notification preferences (email + in-app toggle)
- Account settings and logout

### ✅ Task Management
- Create, edit, delete tasks
- Set task title, description, deadline, and priority (Low / Medium / High)
- Make tasks recurring (daily / weekly / custom intervals)
- Organize tasks into folders or tags (e.g., "Work", "School")
- Drag & drop reordering of tasks

### 🪜 Subtasks with Status
- Add multiple subtasks under any task
- Subtask-level metadata:
  - Status: ✅ Completed | 🕒 Pending | ❌ Canceled
  - Optional due date
  - Assigned user (in collaborative tasks)
- Visual task completion tracker (progress bar or ring)

### 👥 Collaboration
- Share tasks with others via invite
- Role-based permissions:
  - **Owner:** Full access
  - **Editor:** Can edit subtasks
  - **Viewer:** Read-only access
- Comments section per task (with user tags)
- Real-time updates with activity feed
- Notification on changes (subtask added, completed, comment added)

### 🗓️ Task Views
- **Today View:** Focus on tasks due today
- **Upcoming View:** Tasks due in next 7 days
- **All Tasks View:** Overview of all active and archived tasks
- **Calendar View:** Monthly visual map of due dates
- Filter & sort by: status, priority, tags, or assignees

### 🛎️ Notifications
**Email Alerts:**
- Daily summary
- Due soon reminder
- When you're assigned a task or mentioned

**In-app Popups:**
- Task reminders
- Subtask status updates
- Collaboration activity

### 🌙 Theme & Design
- Toggle between Dark Mode and Light Mode
- Minimal, elegant layout with animated transitions
- Consistent iconography and typographic hierarchy
- Accessible color contrast
- Responsive layout for all screen sizes

### 🔍 Other Features
- **Global Search:** Quickly find tasks or tags
- **Tags or Labels:** Visual task grouping
- **Task Templates:** Quickly create common task types
- **Dashboard Analytics:**
  - Weekly completion rate
  - Pending/overdue tasks
- Archive completed tasks for reference
- Task duplication or bulk actions

## 5. Technical Stack (Recommended)

| Layer | Technology |
|-------|------------|
| Frontend | React + Tailwind CSS (or Next.js) |
| Backend | Node.js with Supabase or Firebase |
| Database | Supabase Postgres / Firestore |
| Auth | Supabase Auth / Firebase Auth |
| Notifications | Resend (email), Socket.IO or Supabase Realtime (in-app) |
| Hosting | Vercel or Netlify |

## 6. User Roles
- **Regular User:** Can manage personal tasks and collaborate
- **Collaborator:** Has shared access to specific tasks
- **Owner/Admin (optional):** Can oversee workspace-level settings (for future expansion)

## 7. Success Metrics
- User retention after 7 days
- Number of tasks completed per user
- Engagement with collaborative tasks
- Notification open/click-through rates
- Task completion streaks

## 8. Future Roadmap (Optional Enhancements)
- Voice task input
- Time-blocking or Pomodoro mode
- Public or sharable task boards
- AI-based task suggestions
- Mobile version (React Native)
- Integration with Google Calendar, Notion, Slack

---

## Development Phase Planning

### ✅ Step 1: Wireframe Design for UI Pages
Core pages to wireframe:

1. **Auth Pages**
   - Login
   - Sign Up
   - Forgot Password

2. **Dashboard**
   - Sidebar navigation (Tasks, Today, Upcoming, Calendar, Profile)
   - Task overview section
   - Quick add task/subtask
   - Filter & sort tools

3. **Task Detail Page**
   - Task title, description, due date
   - Subtasks with status toggles (✅/🕒/❌)
   - Collaboration section (assignees, comments)
   - Activity log

4. **Calendar View**
   - Monthly layout
   - Visual task indicators per day
   - Click-to-view/edit task modal

5. **Profile Page**
   - Edit personal info
   - Notification preferences
   - Account settings
   - Task stats (completion rate, streaks)

6. **Collaboration Modal**
   - Invite users
   - Assign roles (Editor, Viewer)
   - See active collaborators

### ✅ Step 2: Component List & Structure
Reusable components for consistency:

**Auth**
- AuthForm
- InputField
- AuthLayout

**Layout**
- Sidebar
- Topbar
- ThemeToggle
- NotificationBell

**Task Management**
- TaskCard
- SubtaskItem
- TaskModal
- TaskEditor
- TaskProgressBar

**Collaboration**
- CollaboratorList
- InviteUserModal
- CommentBox

**Common**
- Button
- Badge
- Dropdown
- DatePicker
- TagSelector
- Avatar

### ✅ Step 3: Product Landing Page for Taskora
Structure outline:

- **Hero Section:** Title + subtitle + CTA
- **Features Highlight:** Icons with key features
- **How It Works:** 3-step process
- **Screenshots/Preview:** Interface sneak peek
- **User Testimonials:** Placeholder content
- **Call to Action:** Final CTA button

### ✅ Step 4: Branding Kit
- **Logo Concepts:** Wordmark + Icon-based, flat and minimal
- **Color Palette:** Primary, secondary, background, accent (dark/light support)
- **Typography:** Modern sans-serif for headings, clean readable font for body 