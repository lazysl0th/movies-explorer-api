import { signinSchema, signupSchema } from '@app/dtos/AuthDto.js'

import validateBody from '../../middleware/validation-zod.middleware.js'

import type { TAuthValidations } from './types.js'

const authValidations: TAuthValidations = {
  signin: validateBody(signinSchema),
  signup: validateBody(signupSchema),
  signout: validateBody(),
}

export default authValidations
