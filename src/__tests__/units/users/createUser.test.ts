import { createUserMock } from "../../../__mocks__/users/user.mocks"
import { prisma } from "../../../database/prisma"
import { IUser } from "../../../interfaces/user.interface"
import { UserService } from "../../../services/user.services"

describe('Unit test: create user', () => {
  beforeEach(async () => await prisma.user.deleteMany())

  test('Should be able to create an user successfully.', async () => {
    const userService = new UserService()

    const data: IUser = await userService.create(createUserMock)

    expect(data.id).toBeDefined()
    expect(data.name).toEqual(createUserMock.name)
    expect(data.email).toEqual(createUserMock.email)

    expect(data.todos).toHaveLength(0)
    expect(data.drafts).toHaveLength(0)
  })
})