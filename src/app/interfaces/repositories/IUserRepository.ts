import type LocalCredentials from '@domain/entities/LocalCredentials.js'
import type User from '@domain/entities/User.js'

export interface IUserWithLocalCredentials {
  user: User
  localCredentials: LocalCredentials
}

export interface IUserRepository {
  generateId: () => string
  getByCredentials: (email: string) => Promise<IUserWithLocalCredentials | null>
  create: (user: IUserWithLocalCredentials) => Promise<User>
  getById: (id: string) => Promise<User | null>
  update: (user: User) => Promise<User | null>
}

export type ILoginUserRepository = Pick<IUserRepository, 'getByCredentials'>
export type IRegisterUserRepository = Pick<
  IUserRepository,
  'generateId' | 'create'
>

export type IGetByIdUserRepository = Pick<IUserRepository, 'getById'>

export type IUpdateUserRepository = Pick<IUserRepository, 'update'> &
  IGetByIdUserRepository
