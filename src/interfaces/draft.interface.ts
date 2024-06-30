export interface IDraft {
  id: string
  title: string | null
  description: string | null
  dueDate: Date | null
  ownerId: string
}