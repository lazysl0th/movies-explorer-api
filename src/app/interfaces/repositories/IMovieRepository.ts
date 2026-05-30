import type Movie from '@domain/entities/Movies.js'

export interface IMovieRepository {
  generateId: () => string
  getAll: (ownerId: string) => Promise<Movie[]>
  create: (movie: Movie) => Promise<Movie>
}

export type TGetMoviesRepository = Pick<IMovieRepository, 'getAll'>
export type TCreateMovieRepository = Pick<
  IMovieRepository,
  'generateId' | 'create'
>
