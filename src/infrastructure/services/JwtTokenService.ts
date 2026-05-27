import jwt from 'jsonwebtoken'

import type { SignOptions } from 'jsonwebtoken'

import type ITokenService from '@app/interfaces/services/ITokenService.js'

export default class JwtTokenService implements ITokenService {
  constructor(private readonly jwtSecret: string) {}

  generate(payload: object, signOptions?: SignOptions): string {
    return jwt.sign(payload, this.jwtSecret, signOptions)
  }

  verify(token: string): string | object {
    return jwt.verify(token, this.jwtSecret)
  }
}
