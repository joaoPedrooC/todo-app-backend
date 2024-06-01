import { TTodoCreate } from "../../interfaces/todo.interface";

export const createTodoMock: TTodoCreate = {
  title: 'This is a title',
  description: 'This is a description',
  dueDate: new Date('2024-06-01T20:41:29.322Z')
}

export const createTodoWithoutDescription: TTodoCreate = {
  title: 'This is a title',
  dueDate: new Date('2024-06-01T20:41:29.322Z')
}