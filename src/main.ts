import http from 'node:http'

import { createTerminus } from '@godaddy/terminus'
import swaggerUi from 'swagger-ui-express'

import LocalAuth from '@app/use-cases/auth/LocalAuth.js'
import Register from '@app/use-cases/auth/Register.js'
import GetProfile from '@app/use-cases/users/GetProfile.js'
import getTerminusOptions from '@infrastructure/config/terminus.config.js'
import openApiDocumentation from '@infrastructure/http/apiDocs/index.docs.js'
import AuthController from '@infrastructure/http/modules/auth/AuthController.js'
import createAuthRoutes from '@infrastructure/http/modules/auth/authRoutes.js'
import authValidations from '@infrastructure/http/modules/auth/authValidations.js'
import UserController from '@infrastructure/http/modules/user/UserController.js'
import createUserRoutes from '@infrastructure/http/modules/user/userRoutes.js'
import createDocRoutes from '@infrastructure/http/routes/docRoutes.js'
import Database from '@infrastructure/persistence/database.module.js'
import UserModel from '@infrastructure/persistence/mongodb/UserModel.js'
import MongooseUserRepository from '@infrastructure/persistence/repositories/MongooseUserRepository.js'
import BcryptHashService from '@infrastructure/services/BcryptHashService.js'
import JwtTokenService from '@infrastructure/services/JwtTokenService.js'
import MongooseService from '@infrastructure/services/MongooseService.js'

import config from './infrastructure/config/env.js'
import AppRouter from './infrastructure/http/routes/indexRoutes.js'
import App from './infrastructure/http/server.js'
import {
  handlerCriticalError,
  handlerListenServer,
  handlerServerError,
} from './infrastructure/utils/utils.js'

function bootstrap() {
  const docRoutes = createDocRoutes(
    ...swaggerUi.serve,
    swaggerUi.setup(openApiDocumentation),
  )

  const mongooseUserRepository = new MongooseUserRepository(UserModel)
  const hashService = new BcryptHashService(config.SALT_ROUNDS)
  const tokenService = new JwtTokenService(config.JWT_SECRET)
  const localAuth = new LocalAuth(
    mongooseUserRepository,
    hashService,
    tokenService,
  )
  const register = new Register(mongooseUserRepository, hashService)
  const authController = new AuthController(localAuth, register)

  const getProfile = new GetProfile(mongooseUserRepository)
  const userController = new UserController(getProfile)
  const authRoutes = createAuthRoutes(authValidations, authController)
  const userRoutes = createUserRoutes(userController)

  const appRouter = new AppRouter(docRoutes, authRoutes, userRoutes)
  const mongoose = new MongooseService(config.MONGODB_URI)
  const dbModule = new Database(mongoose)

  const app = new App(appRouter, dbModule)

  app.start()

  const server = http.createServer(app.express)

  createTerminus(server, getTerminusOptions(app))

  server.on('error', (err) => handlerServerError(err, server))

  server.listen(config.PORT, handlerListenServer)

  process.on('uncaughtException', handlerCriticalError)
}

bootstrap()
