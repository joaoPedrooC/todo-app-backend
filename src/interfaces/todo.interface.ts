export interface Todo {
  id: String
  title: String
  description?: String
  status: boolean
  createdAt: Date
  dueDate: Date
}