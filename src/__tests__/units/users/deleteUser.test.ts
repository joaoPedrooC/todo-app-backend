import { createUserMock } from "../../../__mocks__/users/user.mocks"
import { prisma } from "../../../database/prisma"
import { IUser } from "../../../interfaces/user.interface"
import { UserService } from "../../../services/user.services"

describe('Unit test: delete user', () => {
  beforeEach(async () => await prisma.user.deleteMany())
  
  test('Should be able to delete an user successfully.', async () => {
    const userService = new UserService()
    const user: IUser = await userService.create(createUserMock)

    await userService.delete(user.id)
    const response: Omit<IUser, 'todos' | 'drafts'> | null = await prisma.user.findFirst({ where: { id: user.id } })

    expect(response).toBeNull()
  })
})