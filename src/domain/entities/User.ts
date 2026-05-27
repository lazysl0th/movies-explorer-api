import type IHashService from '@app/interfaces/services/IHashService.js'
import type passwordHash from '@domain/value-objects/user/PasswordHash.js'

export default class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string,
    public readonly passwordHash: passwordHash,
  ) {}

  public toJSON() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
    }
  }
}
