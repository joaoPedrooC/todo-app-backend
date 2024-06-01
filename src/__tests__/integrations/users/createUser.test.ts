import { createUserMock } from "../../../__mocks__/users/user.mocks"
import { prisma } from "../../../database/prisma"
import { request } from "../../utils/request"

describe('Integration test: create user.', () => {
  beforeEach(async () => await prisma.user.deleteMany())

  test('Should be able to create user successfully.', async () => {
    const { body } = await request.post('/users').send(createUserMock).expect(201)

    expect(body.id).toBeDefined()
    expect(body.name).toEqual(createUserMock.name)
    expect(body.email).toEqual(createUserMock.email)

    expect(body.todos).toBeDefined()
    expect(body.drafts).toBeDefined()
  })
})