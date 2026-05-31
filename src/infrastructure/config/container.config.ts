import 'reflect-metadata'
import swaggerUi from 'swagger-ui-express'
import { container } from 'tsyringe'

import LocalAuth from '@app/use-cases/auth/LocalAuth.js'
import Register from '@app/use-cases/auth/Register.js'
import AddMovie from '@app/use-cases/movies/AddMovie.js'
import DeleteMovie from '@app/use-cases/movies/DeleteMovie.js'
import GetUserMovies from '@app/use-cases/movies/GetUserMovies.js'
import GetProfile from '@app/use-cases/users/GetProfile.js'
import UpdateProfile from '@app/use-cases/users/UpdateProfile.js'
import openApiDocumentation from '@infrastructure/http/appDocs.js'
import createAppRoutes from '@infrastructure/http/appRoutes.js'
import passportAuth from '@infrastructure/http/middleware/passportAuth.middleware.js'
import AuthController from '@infrastructure/http/modules/auth/AuthController.js'
import createAuthRoutes from '@infrastructure/http/modules/auth/authRoutes.js'
import authValidations from '@infrastructure/http/modules/auth/authValidations.js'
import initializePassport from '@infrastructure/http/modules/auth/passport/passport.config.js'
import createDocRoutes from '@infrastructure/http/modules/docs/docRoutes.js'
import MovieController from '@infrastructure/http/modules/movies/MovieController.js'
import createMovieRoutes from '@infrastructure/http/modules/movies/movieRoutes.js'
import movieValidations from '@infrastructure/http/modules/movies/movieValidations.js'
import UserController from '@infrastructure/http/modules/users/UserController.js'
import createUserRoutes from '@infrastructure/http/modules/users/userRoutes.js'
import userValidations from '@infrastructure/http/modules/users/userValidations.js'
import App from '@infrastructure/http/server.js'
import Database from '@infrastructure/persistence/database.module.js'
import MovieModel from '@infrastructure/persistence/mongodb/MovieModel.js'
import UserModel from '@infrastructure/persistence/mongodb/UserModel.js'
import MongooseMovieRepository from '@infrastructure/persistence/repositories/MongooseMovieRepository.js'
import MongooseUserRepository from '@infrastructure/persistence/repositories/MongooseUserRepository.js'
import BcryptHashService from '@infrastructure/services/BcryptHashService.js'
import JwtTokenService from '@infrastructure/services/JwtTokenService.js'
import MongooseService from '@infrastructure/services/MongooseService.js'

import config from './env.config.js'

const createApp = (): App => {
  container.register('Config', { useValue: config })
  container.register('UserModel', { useValue: UserModel })
  container.register('MovieModel', { useValue: MovieModel })

  container.register('UserRepository', { useClass: MongooseUserRepository })
  container.register('MovieRepository', { useClass: MongooseMovieRepository })
  container.register('HashService', { useClass: BcryptHashService })
  container.register('TokenService', { useClass: JwtTokenService })

  container.register('LocalAuth', { useClass: LocalAuth })
  container.register('Register', { useClass: Register })
  container.register('GetProfile', { useClass: GetProfile })
  container.register('UpdateProfile', { useClass: UpdateProfile })
  container.register('GetUserMovies', { useClass: GetUserMovies })
  container.register('AddMovie', { useClass: AddMovie })
  container.register('DeleteMovie', { useClass: DeleteMovie })

  const userRepository =
    container.resolve<MongooseUserRepository>('UserRepository')

  initializePassport(userRepository)

  const authController = container.resolve(AuthController)
  const userController = container.resolve(UserController)
  const movieController = container.resolve(MovieController)

  const docRoutes = createDocRoutes(
    ...swaggerUi.serve,
    swaggerUi.setup(openApiDocumentation),
  )
  const authRoutes = createAuthRoutes(authValidations, authController)
  const userRoutes = createUserRoutes(userController, userValidations)
  const movieRoutes = createMovieRoutes(movieValidations, movieController)

  const appRoutes = createAppRoutes(
    {
      auth: authRoutes,
      doc: docRoutes,
      users: userRoutes,
      movies: movieRoutes,
    },
    passportAuth,
  )

  container.register('appRoutes', { useValue: appRoutes })
  container.register('MongooseService', { useClass: MongooseService })
  container.register('dbModule', { useClass: Database })

  const app = container.resolve(App)
  return app
}

export default createApp
