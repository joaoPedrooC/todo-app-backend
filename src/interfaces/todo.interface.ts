export interface ITodo {
  id: string
  title: string
  description?: string | null
  status: boolean
  createdAt: Date
  dueDate: Date
  finishedAt: Date | null
  ownerId: string
}

export type TTodoCreate = Omit<ITodo, 'id' | 'status' | 'createdAt' | 'finishedAt' | 'ownerId'>