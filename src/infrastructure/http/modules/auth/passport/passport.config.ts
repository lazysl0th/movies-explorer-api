import passport from 'passport'

import createJwtStrategy from './strategies/jwt.strategy.js'

import type { IGetByIdUserRepository } from '@app/interfaces/repositories/IUserRepository.js'

function initializePassport(getUserRepository: IGetByIdUserRepository): void {
  passport.use('jwt', createJwtStrategy(getUserRepository))
}

export default initializePassport
