import type { DeleteResult } from 'mongoose'

import type { TDeleteMovieParamsDto } from '@app/dtos/MovieDto.js'
import type Movie from '@domain/entities/Movies.js'

export interface IDeleteCredentials extends TDeleteMovieParamsDto {
  userId: string
}

export interface IMovieRepository {
  generateId: () => string
  getAll: (ownerId: string) => Promise<Movie[]>
  create: (movie: Movie) => Promise<Movie>
  delete: (movieId: string) => Promise<DeleteResult>
  getById: (movieId: string) => Promise<Movie | null>
}

export type TGetMoviesRepository = Pick<IMovieRepository, 'getAll'>
export type TCreateMovieRepository = Pick<
  IMovieRepository,
  'generateId' | 'create'
>
export type TDeleteMovieRepository = Pick<
  IMovieRepository,
  'getById' | 'delete'
>
