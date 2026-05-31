import passport from 'passport'

import UnauthorizedError from '@domain/errors/UnauthorizedError.js'

import type { NextFunction, Request, Response } from 'express'

import type User from '@domain/entities/User.js'

const passportAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  passport.authenticate(
    'jwt',
    { session: false },
    (err: unknown, user: User) => {
      if (err) {
        next(err)
        return
      }
      if (!user) {
        next(new UnauthorizedError())
        return
      }
      req.user = user
      next()
    },
  )(req, res, next)
}

export default passportAuth
