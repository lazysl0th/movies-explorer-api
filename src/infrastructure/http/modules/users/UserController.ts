import { inject, injectable } from 'tsyringe'

import GetProfile from '@app/use-cases/users/GetProfile.js'
import UpdateProfile from '@app/use-cases/users/UpdateProfile.js'
import UnauthorizedError from '@domain/errors/UnauthorizedError.js'
import HttpStatusCode from '@infrastructure/constants/https-status-code.js'

import type { TGetProfileHandler, TUpdateProfileHandler } from './types.js'

@injectable()
export default class UserController {
  constructor(
    @inject('GetProfile') private readonly getProfile: GetProfile,
    @inject('UpdateProfile') private readonly updateProfile: UpdateProfile,
  ) {}

  getUserProfile: TGetProfileHandler = async (req, res) => {
    const id = req.user?.id
    if (!id) throw new UnauthorizedError()
    const user = await this.getProfile.execute(id)
    res.status(HttpStatusCode.Ok).send(user)
  }

  updateUserProfile: TUpdateProfileHandler = async (req, res) => {
    const id = req.user?.id
    if (!id) throw new UnauthorizedError()
    const { name, email } = req.body
    const user = await this.updateProfile.execute({ id, name, email })
    res.status(HttpStatusCode.Ok).send(user)
  }
}
