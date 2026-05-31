import UnauthorizedError from '@domain/errors/UnauthorizedError.js'
import HttpStatusCode from '@infrastructure/constants/https-status-code.js'

import type GetProfile from '@app/use-cases/users/GetProfile.js'
import type UpdateProfile from '@app/use-cases/users/UpdateProfile.js'

import type { TGetProfileHandler, TUpdateProfileHandler } from './types.js'

export default class UserController {
  constructor(
    private readonly getProfile: GetProfile,
    private readonly updateProfile: UpdateProfile,
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
