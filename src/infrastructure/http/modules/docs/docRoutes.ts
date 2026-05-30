import { Router } from 'express'

import type { RequestHandler } from 'express'

const createDocRoutes = (...requestHandler: RequestHandler[]): Router => {
  const router = Router()
  router.use('/', requestHandler)
  return router
}

export default createDocRoutes
