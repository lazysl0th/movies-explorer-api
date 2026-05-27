import HttpStatusCode from '@infrastructure/constants/https-status-code.js'

import type LocalAuth from '@app/use-cases/auth/LocalAuth.js'

import type { TLoginHandler } from './types.js'

export default class AuthController {
  constructor(private localAuth: LocalAuth) {}

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
}
