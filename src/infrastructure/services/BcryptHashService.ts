import bcrypt from 'bcryptjs'

import type IHashService from '@app/interfaces/services/IHashService.js'

export default class BcryptHashService implements IHashService {
  constructor(private readonly saltRounds: number) {}

  async generate(data: string): Promise<string> {
    return bcrypt.hash(data, this.saltRounds)
  }

  // eslint-disable-next-line class-methods-use-this
  async compare(data: string, hash: string): Promise<boolean> {
    return bcrypt.compare(data, hash)
  }
}
