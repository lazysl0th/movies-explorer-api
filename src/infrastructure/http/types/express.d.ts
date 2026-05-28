import type { TRequestUser } from '@app/dtos/UserDto.js'

declare global {
  namespace Express {
    interface Request {
      user: TRequestUser
    }
  }
}
