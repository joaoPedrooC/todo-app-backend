import { createTodoMock, createTodoWithoutDescription } from "../../../__mocks__/todos/todo.mocks"
import { createUserMock } from "../../../__mocks__/users/user.mocks"
import { prisma } from "../../../database/prisma"
import { TodoService } from "../../../services/todo.services"
import { UserService } from "../../../services/user.services"

describe('Unit test: create todo', () => {
  beforeAll(async () => {
    const userService = new UserService()

    await prisma.user.deleteMany()
    await userService.create(createUserMock)
  })

  beforeEach(async () => {
    await prisma.todo.deleteMany()
  })

  test('Should be able to create todo successfully.', async () => {
    const todoService = new TodoService()
    const user = await prisma.user.findMany()

    const todo = await todoService.create(createTodoMock, user[0].id)

    expect(todo.id).toBeDefined()
    expect(todo.title).toEqual(createTodoMock.title)
    expect(todo.description).toEqual(createTodoMock.description)
    expect(todo.dueDate).toEqual(createTodoMock.dueDate)
    expect(todo.ownerId).toBe(user[0].id)

    expect(todo.createdAt).toBeDefined()
    expect(todo.finishedAt).toBeNull()
    expect(todo.status).toBe(false)
  })

  test('Should be able to create todo without description.', async () => {
    const todoService = new TodoService()
    const user = await prisma.user.findMany()

    const todo = await todoService.create(createTodoWithoutDescription, user[0].id)

    expect(todo.id).toBeDefined()
    expect(todo.title).toEqual(createTodoMock.title)
    expect(todo.description).toBeNull()
    expect(todo.dueDate).toEqual(createTodoMock.dueDate)
    expect(todo.ownerId).toBe(user[0].id)

    expect(todo.createdAt).toBeDefined()
    expect(todo.finishedAt).toBeNull()
    expect(todo.status).toBe(false)
  })
})