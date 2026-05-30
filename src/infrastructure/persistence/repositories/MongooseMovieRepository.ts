import { mongo, MongooseError, Types } from 'mongoose'

import Movie from '@domain/entities/Movies.js'
import BadRequestError from '@domain/errors/BadRequestError.js'
import ConflictError from '@domain/errors/ConflictError.js'

import type { IMovieRepository } from '@app/interfaces/repositories/IMovieRepository.js'

import type { TMovieDocument, TMovieModel } from '../mongodb/MovieModel.js'

export default class MongooseMovieRepository implements IMovieRepository {
  constructor(private readonly movieModel: TMovieModel) {}

  // eslint-disable-next-line class-methods-use-this
  public generateId(): string {
    return new Types.ObjectId().toHexString()
  }

  // eslint-disable-next-line class-methods-use-this
  private createMovie(movieDocument: TMovieDocument): Movie {
    return new Movie({
      id: movieDocument._id.toString(),
      country: movieDocument.country,
      director: movieDocument.director,
      duration: movieDocument.duration,
      year: movieDocument.year,
      description: movieDocument.description,
      image: movieDocument.image,
      trailer: movieDocument.trailer,
      thumbnail: movieDocument.thumbnail,
      owner: movieDocument.owner._id.toString(),
      movieId: movieDocument.movieId,
      nameRU: movieDocument.nameRU,
      nameEN: movieDocument.nameEN,
    })
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
    const movieDocument = await this.movieModel
      .find({ owner: ownerId })
      .populate('owner')
    return movieDocument.map((movie) => this.createMovie(movie))
  }

  async create(movie: Movie): Promise<Movie> {
    try {
      const movieDocument = await this.movieModel.create({
        _id: movie.id,
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image,
        trailer: movie.trailer,
        thumbnail: movie.thumbnail,
        owner: movie.owner,
        movieId: movie.movieId,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      })
      return this.createMovie(movieDocument)
    } catch (e) {
      return this.handleError(e)
    }
  }
}
