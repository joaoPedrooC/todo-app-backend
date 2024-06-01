import { createUserMock, updateCompleteUserMock, updatePartialUserMock } from "../../../__mocks__/users/user.mocks"
import { prisma } from "../../../database/prisma"
import { IUser } from "../../../interfaces/user.interface"
import { UserService } from "../../../services/user.services"

describe('Unit test: update user', () => {
  beforeEach(async () => await prisma.user.deleteMany())

  test('Should be able to update all keys of an user.', async () => {
    const userService = new UserService()
    const user: Omit<IUser, 'todos' | 'drafts'> = await prisma.user.create({ data: createUserMock })

    const data: IUser = await userService.update(updateCompleteUserMock, user.id)

    expect(data.id).toBe(user.id)
    expect(data.name).toBe(updateCompleteUserMock.name)
    expect(data.email).toBe(updateCompleteUserMock.email)

    expect(data.todos).toHaveLength(0)
    expect(data.drafts).toHaveLength(0)
  })

  test('Should be able to update an user with partial keys.', async () => {
    const userService = new UserService()
    const user = await prisma.user.create({ data: createUserMock })

    const data = await userService.update(updatePartialUserMock, user.id)

    expect(data.id).toBe(user.id)
    expect(data.name).toBe(updatePartialUserMock.name)
    expect(data.email).toBe(user.email)

    expect(data.todos).toHaveLength(0)
    expect(data.drafts).toHaveLength(0)
  })
})