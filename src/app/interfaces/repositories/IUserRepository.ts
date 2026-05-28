import type User from '@domain/entities/User.js'

export type TNewUser = Pick<User, 'email' | 'name' | 'passwordHash'>

export interface IUserRepository {
  findUserByCredentials: (email: string) => Promise<User | null>
  create: (user: TNewUser) => Promise<User>
  findById: (id: string) => Promise<User | null>
}

export type ILoginUserRepository = Pick<
  IUserRepository,
  'findUserByCredentials'
>
export type IRegisterUserRepository = Pick<IUserRepository, 'create'>

export type IFindByIdUserRepository = Pick<IUserRepository, 'findById'>
