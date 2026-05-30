import { mongo, MongooseError, Types } from 'mongoose'

import Movie from '@domain/entities/Movies.js'
import User from '@domain/entities/User.js'
import BadRequestError from '@domain/errors/BadRequestError.js'
import ConflictError from '@domain/errors/ConflictError.js'

import type { IMovieRepository } from '@app/interfaces/repositories/IMovieRepository.js'

import type { TMovieModel } from '../mongodb/MovieModel.js'
import type { TUserDocument } from '../mongodb/UserModel.js'

export default class MongooseMovieRepository implements IMovieRepository {
  constructor(private readonly movieModel: TMovieModel) {}

  // eslint-disable-next-line class-methods-use-this
  public generateId(): string {
    return new Types.ObjectId().toHexString()
  }

  // eslint-disable-next-line class-methods-use-this
  private handleError(e: unknown): never {
    if (e instanceof mongo.MongoServerError && e.code === 11000) {
      throw new ConflictError('User')
    }
    if (
      e instanceof MongooseError &&
      (e.name === 'CastError' || e.name === 'ValidationError')
    ) {
      throw new BadRequestError()
    }
    throw e
  }

  async getAll(ownerId: string): Promise<Movie[]> {
    const moviesData = await this.movieModel
      .find({ owner: ownerId })
      .populate<{ owner: TUserDocument }>('owner', 'email name')
    console.log(moviesData)
    return moviesData.map(
      (movie) =>
        new Movie({
          id: movie._id.toString(),
          country: movie.country,
          director: movie.director,
          duration: movie.duration,
          year: movie.year,
          description: movie.description,
          image: movie.image,
          trailer: movie.trailer,
          thumbnail: movie.thumbnail,
          owner: new User({
            id: movie.owner._id.toString(),
            name: movie.owner.name,
            email: movie.owner.email,
          }),
          movieId: movie.movieId,
          nameRU: movie.nameRU,
          nameEN: movie.nameEN,
        }),
    )
  }
}
