import { createUserMock } from "../../../__mocks__/users/user.mocks"
import { prisma } from "../../../database/prisma"
import { request } from "../../utils/request"

describe('Integration test: delete user.', () => {
  beforeEach(async () => await prisma.user.deleteMany())

  test('Should be able to delete user successfully.', async () => {
    const { body: user } = await request.post('/users').send(createUserMock).expect(201)
    const { body: { token } } = await request.post('/session').send({ email: createUserMock.email, password: createUserMock.password }).expect(200)

    await request.delete(`/users/${user.id}`).set('Authorization', `Bearer ${token}`).expect(204)
  })

  test('Should not be able to delete user: invalid id', async () => {
    const { body } = await request.delete(`/users/123`).expect(404)

    expect(body.message).toBe('User not found.')
  })
})