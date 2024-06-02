import { createTodoMock, updateTodoCompleteMock } from "../../../__mocks__/todos/todo.mocks"
import { createUserMock } from "../../../__mocks__/users/user.mocks"
import { prisma } from "../../../database/prisma"
import { TodoService } from "../../../services/todo.services"
import { UserService } from "../../../services/user.services"

describe('Unit test: update todo', () => {
  beforeAll(async () => {
    const userService = new UserService()

    await prisma.user.deleteMany()
    await userService.create(createUserMock)
  })

  beforeEach(async () => {
    const todoService = new TodoService()
    const user = await prisma.user.findMany()

    await prisma.todo.deleteMany()
    await todoService.create(createTodoMock, user[0].id)
  })

  test('Should be able to update todo with complete body.', async () => {
    const todoService = new TodoService()
    
    const todo = await prisma.todo.findMany()
    const response = await todoService.update(updateTodoCompleteMock, todo[0].id)

    expect(response.title).toEqual(updateTodoCompleteMock.title)
    expect(response.description).toEqual(updateTodoCompleteMock.description)
    expect(response.dueDate).toEqual(updateTodoCompleteMock.dueDate)

    expect(response.id).toEqual(todo[0].id)
    expect(response.createdAt).toEqual(todo[0].createdAt)

    expect(response.status).toBe(true)
    expect(response.finishedAt).toBeDefined()
  })
})