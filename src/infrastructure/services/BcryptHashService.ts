import bcrypt from 'bcryptjs'
import { inject, injectable } from 'tsyringe'

import type IHashService from '@app/interfaces/services/IHashService.js'
import type { TBcryptServiceConfig } from '@infrastructure/config/env.config.js'

@injectable()
export default class BcryptHashService implements IHashService {
  constructor(
    @inject('Config') private readonly config: TBcryptServiceConfig,
  ) {}

  async generate(data: string): Promise<string> {
    return bcrypt.hash(data, this.config.SALT_ROUNDS)
  }

  // eslint-disable-next-line class-methods-use-this
  async compare(data: string, hash: string): Promise<boolean> {
    return bcrypt.compare(data, hash)
  }
}
