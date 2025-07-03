import { format, isToday, isTomorrow, isYesterday, differenceInDays } from 'date-fns'

export function formatDate(date: string | Date, formatStr: string = 'MMM d, yyyy'): string {
  return format(new Date(date), formatStr)
}

export function formatRelativeDate(date: string | Date): string {
  const dateObj = new Date(date)
  
  if (isToday(dateObj)) {
    return 'Today'
  }
  
  if (isTomorrow(dateObj)) {
    return 'Tomorrow'
  }
  
  if (isYesterday(dateObj)) {
    return 'Yesterday'
  }
  
  const daysDiff = differenceInDays(dateObj, new Date())
  
  if (daysDiff > 0 && daysDiff <= 7) {
    return `${daysDiff} days`
  }
  
  if (daysDiff < 0 && daysDiff >= -7) {
    return `${Math.abs(daysDiff)} days ago`
  }
  
  return formatDate(date)
}

export function isOverdue(date: string | Date): boolean {
  return new Date(date) < new Date()
}

export function getDaysUntilDue(date: string | Date): number {
  return differenceInDays(new Date(date), new Date())
} 