import { create } from 'zustand'

export type NotificationType = 'success' | 'error' | 'info' | 'warning'

export interface Notification {
  id: string
  message: string
  type: NotificationType
  duration?: number
}

interface NotificationStore {
  notifications: Notification[]
  addNotification: (message: string, type: NotificationType, duration?: number) => void
  removeNotification: (id: string) => void
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  
  addNotification: (message: string, type: NotificationType, duration = 5000) => {
    const id = `${Date.now()}-${Math.random()}`
    set((state) => ({
      notifications: [...state.notifications, { id, message, type, duration }],
    }))

    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({
          notifications: state.notifications.filter((notif) => notif.id !== id),
        }))
      }, duration)
    }
  },

  removeNotification: (id: string) => {
    set((state) => ({
      notifications: state.notifications.filter((notif) => notif.id !== id),
    }))
  },
}))
