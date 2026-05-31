import type { TRequestUser } from '@app/dtos/UserDto.js'

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface User extends TRequestUser {}
  }
}
