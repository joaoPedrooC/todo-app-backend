import { createTodoMock } from "../../../__mocks__/todos/todo.mocks"
import { createUserMock } from "../../../__mocks__/users/user.mocks"
import { prisma } from "../../../database/prisma"
import { TodoService } from "../../../services/todo.services"

describe('Unit test: delete todo', () => {
  beforeAll(async () => {
    await prisma.todo.deleteMany()
    await prisma.user.deleteMany()

    const user = await prisma.user.create({ data: createUserMock })
    await prisma.todo.create({ data: { ...createTodoMock, ownerId: user.id } })
  })

  test('Should be able to delete todo successfully.', async () => {
    const todoService = new TodoService()

    const todo = (await prisma.todo.findMany())[0]
    await todoService.delete(todo.id)

    const todoList = await prisma.todo.findMany()

    expect(todoList).toHaveLength(0)
  })
})