import { beforeEach, describe, expect, it, vi } from 'vitest'

import DeleteMovie from '@app/use-cases/movies/DeleteMovie.js'
import Movie from '@domain/entities/Movies.js'
import ForbiddenError from '@domain/errors/ForbiddenError.js'
import NotFoundError from '@domain/errors/NotFoundError.js'

import type { Mocked } from 'vitest'

import type {
  IDeleteCredentials,
  TDeleteMovieRepository,
} from '@app/interfaces/repositories/IMovieRepository.js'

describe('DeleteMovie Use Case', () => {
  let mockRepository: Mocked<TDeleteMovieRepository>
  let deleteMovie: DeleteMovie

  const fakeMovieId = 'movie-uuid-1234'
  const fakeUserId = 'user-uuid-5678'
  const wrongUserId = 'wrong-user-uuid-9999'

  const fakeMovieData = {
    id: fakeMovieId,
    nameRU: 'The Matrix',
    nameEN: 'The Matrix',
    description: 'A computer hacker learns from mysterious...',
    director: 'Lana Wachowski',
    duration: 136,
    year: '1999',
    country: 'USA',
    image: 'https://example.com/image.jpg',
    thumbnail: 'https://example.com/thumb.jpg',
    trailer: 'https://example.com/trailer',
    owner: fakeUserId,
    movieId: 1,
  }

  let fakeMovie: Movie

  beforeEach(() => {
    fakeMovie = new Movie(fakeMovieData)
    vi.spyOn(fakeMovie, 'isOwnedBy').mockImplementation(
      (userId: string) => userId === fakeUserId,
    )

    mockRepository = {
      getById: vi.fn(),
      delete: vi.fn(),
    }

    deleteMovie = new DeleteMovie(mockRepository)
  })

  it('should successfully delete a movie if it exists and is owned by the user', async () => {
    mockRepository.getById.mockResolvedValue(fakeMovie)
    mockRepository.delete.mockResolvedValue({
      acknowledged: true,
      deletedCount: 1,
    })

    const credentials: IDeleteCredentials = {
      movieId: fakeMovieId,
      userId: fakeUserId,
    }

    const result = await deleteMovie.execute(credentials)

    expect(mockRepository.getById).toHaveBeenCalledTimes(1)
    expect(mockRepository.getById).toHaveBeenCalledWith(fakeMovieId)

    expect(fakeMovie.isOwnedBy).toHaveBeenCalledTimes(1)
    expect(fakeMovie.isOwnedBy).toHaveBeenCalledWith(fakeUserId)

    expect(mockRepository.delete).toHaveBeenCalledTimes(1)
    expect(mockRepository.delete).toHaveBeenCalledWith(fakeMovieId)

    expect(result).toEqual(fakeMovie)
  })

  it('should throw NotFoundError if the movie does not exist', async () => {
    mockRepository.getById.mockResolvedValue(null)

    const credentials: IDeleteCredentials = {
      movieId: 'non-existent-id',
      userId: fakeUserId,
    }

    await expect(deleteMovie.execute(credentials)).rejects.toThrow(
      NotFoundError,
    )

    expect(mockRepository.getById).toHaveBeenCalledTimes(1)
    expect(mockRepository.delete).not.toHaveBeenCalled()
  })

  it('should throw ForbiddenError if the movie is not owned by the user', async () => {
    mockRepository.getById.mockResolvedValue(fakeMovie)

    const credentials: IDeleteCredentials = {
      movieId: fakeMovieId,
      userId: wrongUserId,
    }

    await expect(deleteMovie.execute(credentials)).rejects.toThrow(
      ForbiddenError,
    )

    expect(mockRepository.getById).toHaveBeenCalledTimes(1)
    expect(fakeMovie.isOwnedBy).toHaveBeenCalledWith(wrongUserId)
    expect(mockRepository.delete).not.toHaveBeenCalled()
  })
})
