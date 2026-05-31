import jwt from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import type { SignOptions } from 'jsonwebtoken'

import type ITokenService from '@app/interfaces/services/ITokenService.js'
import type { TJwtServiceConfig } from '@infrastructure/config/env.config.js'

@injectable()
export default class JwtTokenService implements ITokenService {
  constructor(@inject('Config') private readonly config: TJwtServiceConfig) {}

  generate(payload: object, signOptions?: SignOptions): string {
    return jwt.sign(payload, this.config.JWT_SECRET, signOptions)
  }

  verify(token: string): string | object {
    return jwt.verify(token, this.config.JWT_SECRET)
  }
}
