import { signinSchema } from './auth.validation.js'
import validateBody from '../../middleware/validation-zod.middleware.js'

import type { TAuthValidations } from './types.js'

const authValidations: TAuthValidations = {
  signin: validateBody(signinSchema),
}

export default authValidations
