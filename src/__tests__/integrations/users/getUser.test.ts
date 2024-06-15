import { createSecondUserMock, createUserMock } from "../../../__mocks__/users/user.mocks"
import { prisma } from "../../../database/prisma"
import { IUser } from "../../../interfaces/user.interface"
import { userReturnWithoutPassword } from "../../../schemas/user.schemas"
import { UserService } from "../../../services/user.services"
import { request } from "../../utils/request"

describe('Integration test: get user', () => {
  beforeAll(async () => {
    await prisma.user.deleteMany()
    const userService = new UserService()

    await userService.create(createUserMock)
  })

  afterAll(async () => {
    await prisma.user.deleteMany()
  })

  test('Should be able to get an user.', async () => {
    const searchingUser: IUser = (await prisma.user.findMany({ include: { todos: true, drafts: true } }))[0]
    const { body: { token } } = await request.post('/session').send({ email: createUserMock.email, password: createUserMock.password })

    const { body: user } = await request.get(`/users/${searchingUser.id}`).set('Authorization', `Bearer ${token}`).send().expect(200)

    expect(user).toStrictEqual(userReturnWithoutPassword.parse(searchingUser))
  })

  test('Should not be able to get an user.', async () => {
    const { body } = await request.get('/users/randomid').expect(404)

    expect(body.message).toBe('User not found.')
  })

  test('Should not be able to get an user without token.', async () => {
    const { id } = (await prisma.user.findMany())[0]

    const { body } = await request.get(`/users/${id}`).expect(401)

    expect(body.message).toBe('Missing bearer token')
  })

  test('Should not be able to get an user with insufficient permissions.', async () => {
    const { id } = (await prisma.user.findMany())[0]
    
    const userService = new UserService()
    await userService.create(createSecondUserMock)

    const { body: { token } } = (await request.post('/session').send({ email: createSecondUserMock.email, password: createSecondUserMock.password }).expect(200))

    const { body } = await request.get(`/users/${id}`).set('Authorization', `Bearer ${token}`).send().expect(403)

    expect(body.message).toBe('Insufficient permission')
  })

  test('Should not be able to get an user with malformed token.', async () => {
    const { id } = (await prisma.user.findMany())[0]
    const { body } = await request.get(`/users/${id}`).set('Authorization', `Bearer malformedjwt`).expect(403)

    expect(body.message).toBe('jwt malformed')
  })
})