
export * from './[eventId]'

export interface Comment {
  id: string
  eventId: string
  email: string
  name: string
  date: string
  text: string
}