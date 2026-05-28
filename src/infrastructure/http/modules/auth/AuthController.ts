import HttpStatusCode from '@infrastructure/constants/https-status-code.js'

import type { RequestHandler } from 'express'

import type LocalAuth from '@app/use-cases/auth/LocalAuth.js'
import type Register from '@app/use-cases/auth/Register.js'

import type { TLoginHandler, TRegisterHandler } from './types.js'

export default class AuthController {
  constructor(
    private readonly localAuth: LocalAuth,
    private readonly register: Register,
  ) {}

  loginByEmail: TLoginHandler = async (req, res, _) => {
    const { email, password } = req.body
    const { user, token } = await this.localAuth.execute(email, password)
    res
      .status(HttpStatusCode.Ok)
      .cookie('token', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      })
      .send(user)
  }

  registerUser: TRegisterHandler = async (req, res, next) => {
    const { name, email, password } = req.body
    const user = await this.register.execute(name, email, password)
    res.status(HttpStatusCode.Created).send(user)
  }

  // eslint-disable-next-line class-methods-use-this
  logout: RequestHandler = (_, res) =>
    res
      .status(HttpStatusCode.Ok)
      .clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      })
      .send({})
}
