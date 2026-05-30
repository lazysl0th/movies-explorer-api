import { updateUserProfileSchema } from '@app/dtos/UserDto.js'

import { validateBody } from '../../middleware/validation.middleware.js'

import type { TUserValidations } from './types.js'

const userValidations: TUserValidations = {
  me: validateBody(updateUserProfileSchema),
}

export default userValidations
