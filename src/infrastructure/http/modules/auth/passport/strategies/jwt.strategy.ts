import { Strategy as JwtStrategy } from 'passport-jwt'

import config from '@infrastructure/config/env.config.js'

import type { TJwtPayloadDto } from '@app/dtos/AuthDto.js'
import type { IGetByIdUserRepository } from '@app/interfaces/repositories/IUserRepository.js'

import type { ICookieRequest } from '../../types.js'

const createJwtStrategy = (
  getUserRepository: IGetByIdUserRepository,
): JwtStrategy =>
  new JwtStrategy(
    {
      jwtFromRequest: (req: ICookieRequest): string => req.cookies.token,
      secretOrKey: config.JWT_SECRET,
    },
    async (jwtPayload: TJwtPayloadDto, done) => {
      try {
        const user = await getUserRepository.getById(jwtPayload.id)
        if (!user) {
          done(null, false)
          return
        }
        done(null, user)
      } catch (e) {
        done(e)
      }
    },
  )
export default createJwtStrategy
