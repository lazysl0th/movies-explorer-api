import HttpStatusCode from '@infrastructure/constants/https-status-code.js'

import type GetProfile from '@app/use-cases/users/GetProfile.js'

import type { TGetProfileHandler } from './types.js'

export default class UserController {
  constructor(private readonly getProfile: GetProfile) {}

  getUserProfile: TGetProfileHandler = async (req, res, next) => {
    const { id } = req.user
    const user = await this.getProfile.execute(id)
    res.status(HttpStatusCode.Ok).send(user)

    /* User.findById(req.user._id)
      .then((user) => {
        if (!user) {
          throw new NotFoundError(NOT_FOUND.text)
        }
        return res.status(OK.statusCode).send(user)
      })
      .catch((err) => {
        if (err.name === 'CastError' || err.name === 'ValidationError') {
          return next(new BadRequestError(BAD_REQUEST.text))
        }
        return next(err)
      }) */
  }
}
