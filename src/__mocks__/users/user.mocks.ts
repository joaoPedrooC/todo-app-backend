import { IUser, IUserCreate, TUserUpdate } from "../../interfaces/user.interface";

export const createUserMock: IUserCreate = {
  name: "john",
  email: "john@mail.com",
  password: "1234"
}

export const createSecondUserMock: IUserCreate = {
  name: "john2",
  email: "john2@mail.com",
  password: "1234"
}

export const updateCompleteUserMock: TUserUpdate = {
  name: "john doe",
  email: "johndoe@email.com",
  password: "1234"
}

export const updatePartialUserMock: TUserUpdate = {
  name: "john doe"
}


export const invalidUserMock: Pick<IUser, 'name'> = {
  name: "john"
}