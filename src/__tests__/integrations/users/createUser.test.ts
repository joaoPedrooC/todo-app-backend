import { createUserMock, invalidUserMock } from "../../../__mocks__/users/user.mocks"
import { prisma } from "../../../database/prisma"
import { request } from "../../utils/request"

describe('Integration test: create user.', () => {
  beforeEach(async () => await prisma.user.deleteMany())

  test('Should be able to create user successfully.', async () => {
    const { body } = await request.post('/users').send(createUserMock).expect(201)

    expect(body.id).toBeDefined()
    expect(body.name).toEqual(createUserMock.name)
    expect(body.email).toEqual(createUserMock.email)
  })

  test('Should not be able to create user: invalid body.',async  () => {
    const { body } = await request.post('/users').send(invalidUserMock).expect(403)

    expect(body.message).toBeDefined()
  })
})