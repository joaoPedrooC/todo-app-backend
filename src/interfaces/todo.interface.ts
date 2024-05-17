export interface ITodo {
  id: string
  title: string
  description?: string
  status: boolean
  createdAt: Date
  dueDate: Date
  finishedAt: Date
}