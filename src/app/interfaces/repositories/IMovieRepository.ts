import type Movie from '@domain/entities/Movies.js'

export interface IMovieRepository {
  generateId: () => string
  getAll: (ownerId: string) => Promise<Movie[]>
}

export type TGetMoviesRepository = Pick<IMovieRepository, 'getAll'>
