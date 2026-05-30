import type LocalCredentials from '@domain/entities/LocalCredentials.js'
import type User from '@domain/entities/User.js'

export interface IUserWithLocalCredentials {
  user: User
  localCredentials: LocalCredentials
}

export interface IUserRepository {
  generateId: () => string
  findUserByCredentials: (
    email: string,
  ) => Promise<IUserWithLocalCredentials | null>
  create: (user: IUserWithLocalCredentials) => Promise<User>
  findById: (id: string) => Promise<User | null>
  findByIdAndUpdate: (user: User) => Promise<User | null>
}

export type ILoginUserRepository = Pick<
  IUserRepository,
  'findUserByCredentials'
>
export type IRegisterUserRepository = Pick<
  IUserRepository,
  'generateId' | 'create'
>

export type IFindByIdUserRepository = Pick<IUserRepository, 'findById'>

export type IFindByIdAndUpdateUserRepository = Pick<
  IUserRepository,
  'findByIdAndUpdate'
> &
  IFindByIdUserRepository
