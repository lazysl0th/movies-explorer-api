import type { SignOptions } from 'jsonwebtoken'

export default interface ITokenService {
  generate: (payload: object, expiresIn?: SignOptions) => string
  verify: (token: string) => string | object
}

export type TTokenGenerateService = Pick<ITokenService, 'generate'>
