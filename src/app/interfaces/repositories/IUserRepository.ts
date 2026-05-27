import type User from '@domain/entities/User.js'

export default interface IUserRepository {
  findUserByCredentials: (email: string) => Promise<User | null>
}
