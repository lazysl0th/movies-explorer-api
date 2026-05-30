import http from 'node:http'

import { createTerminus } from '@godaddy/terminus'
import swaggerUi from 'swagger-ui-express'

import LocalAuth from '@app/use-cases/auth/LocalAuth.js'
import Register from '@app/use-cases/auth/Register.js'
import GetUserMovies from '@app/use-cases/movies/GetUserMovies.js'
import GetProfile from '@app/use-cases/users/GetProfile.js'
import UpdateProfile from '@app/use-cases/users/UpdateProfile.js'
import getTerminusOptions from '@infrastructure/config/terminus.config.js'
import openApiDocumentation from '@infrastructure/http/indexDocs.js'
import AuthController from '@infrastructure/http/modules/auth/AuthController.js'
import createAuthRoutes from '@infrastructure/http/modules/auth/authRoutes.js'
import authValidations from '@infrastructure/http/modules/auth/authValidations.js'
import createDocRoutes from '@infrastructure/http/modules/docs/docRoutes.js'
import MovieController from '@infrastructure/http/modules/movies/MovieController.js'
import createMovieRoutes from '@infrastructure/http/modules/movies/movieRoutes.js'
import UserController from '@infrastructure/http/modules/users/UserController.js'
import createUserRoutes from '@infrastructure/http/modules/users/userRoutes.js'
import userValidations from '@infrastructure/http/modules/users/userValidations.js'
import Database from '@infrastructure/persistence/database.module.js'
import MovieModel from '@infrastructure/persistence/mongodb/MovieModel.js'
import UserModel from '@infrastructure/persistence/mongodb/UserModel.js'
import MongooseMovieRepository from '@infrastructure/persistence/repositories/MongooseMovieRepository.js'
import MongooseUserRepository from '@infrastructure/persistence/repositories/MongooseUserRepository.js'
import BcryptHashService from '@infrastructure/services/BcryptHashService.js'
import JwtTokenService from '@infrastructure/services/JwtTokenService.js'
import MongooseService from '@infrastructure/services/MongooseService.js'

import config from './infrastructure/config/env.js'
import AppRouter from './infrastructure/http/indexRoutes.js'
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
  const updateProfile = new UpdateProfile(mongooseUserRepository)
  const userController = new UserController(getProfile, updateProfile)
  const authRoutes = createAuthRoutes(authValidations, authController)
  const userRoutes = createUserRoutes(userController, userValidations)
  const mongooseMovieRepository = new MongooseMovieRepository(MovieModel)
  const getUserMovies = new GetUserMovies(mongooseMovieRepository)
  const movieController = new MovieController(getUserMovies)
  const movieRoutes = createMovieRoutes(movieController)

  const appRouter = new AppRouter(
    docRoutes,
    authRoutes,
    userRoutes,
    movieRoutes,
  )
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
