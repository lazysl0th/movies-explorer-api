import validator from 'validator'
import z from 'zod'

import { movieResponseDescription } from '@app/constants/responses-descriptions.js'
import VALIDATION_RESPONSE from '@app/constants/validation-responses.js'

const { image, trailer, thumbnail } = VALIDATION_RESPONSE

export const addMovieBodySchema = z.object({
  country: z.string().meta({
    description: movieResponseDescription.countryDescription,
    example: movieResponseDescription.countryExample,
  }),
  director: z.string().meta({
    description: movieResponseDescription.directorDescription,
    example: movieResponseDescription.directorExample,
  }),
  duration: z.number().meta({
    description: movieResponseDescription.durationDescription,
    example: movieResponseDescription.durationExample,
  }),
  year: z.string().meta({
    description: movieResponseDescription.yearDescription,
    example: movieResponseDescription.yearExample,
  }),
  description: z.string().meta({
    description: movieResponseDescription.descriptionDescription,
    example: movieResponseDescription.descriptionExample,
  }),
  image: z
    .string()
    .refine((value) => validator.isURL(value), {
      message: image.validate,
    })
    .meta({
      description: movieResponseDescription.imageDescription,
      example: movieResponseDescription.imageExample,
    }),
  trailer: z
    .string()
    .refine((value) => validator.isURL(value), {
      message: trailer.validate,
    })
    .meta({
      description: movieResponseDescription.trailerDescription,
      example: movieResponseDescription.trailerExample,
    }),
  thumbnail: z.string().refine((value) => validator.isURL(value), {
    message: thumbnail.validate,
  }),
  movieId: z.number().meta({
    description: movieResponseDescription.movieIdDescription,
    example: movieResponseDescription.movieIdExample,
  }),
  nameRU: z.string().meta({
    description: movieResponseDescription.nameRUDescription,
    example: movieResponseDescription.nameRUExample,
  }),
  nameEN: z.string().meta({
    description: movieResponseDescription.nameENDescription,
    example: movieResponseDescription.nameENExample,
  }),
})

export const addMovieSchema = addMovieBodySchema.extend({
  owner: z.string().meta({
    description: movieResponseDescription.ownerDescription,
    example: movieResponseDescription.ownerExample,
  }),
})

export const deleteMovieSchema = z.object({
  movieId: z.string().length(24).meta({
    description: movieResponseDescription.ownerDescription,
    example: movieResponseDescription.ownerExample,
  }),
})

export const movieResponseSchema = z.object({
  country: z.string().meta({
    description: movieResponseDescription.countryDescription,
    example: movieResponseDescription.countryExample,
  }),
  director: z.string().meta({
    description: movieResponseDescription.directorDescription,
    example: movieResponseDescription.directorExample,
  }),
  duration: z.number().meta({
    description: movieResponseDescription.durationDescription,
    example: movieResponseDescription.durationExample,
  }),
  year: z.string().meta({
    description: movieResponseDescription.yearDescription,
    example: movieResponseDescription.yearExample,
  }),
  description: z.string().meta({
    description: movieResponseDescription.descriptionDescription,
    example: movieResponseDescription.descriptionExample,
  }),
  image: z
    .string()
    .refine((value) => validator.isURL(value), {
      message: image.validate,
    })
    .meta({
      description: movieResponseDescription.imageDescription,
      example: movieResponseDescription.imageExample,
    }),
  trailer: z
    .string()
    .refine((value) => validator.isURL(value), {
      message: trailer.validate,
    })
    .meta({
      description: movieResponseDescription.trailerDescription,
      example: movieResponseDescription.trailerExample,
    }),
  thumbnail: z
    .string()
    .refine((value) => validator.isURL(value), {
      message: thumbnail.validate,
    })
    .meta({
      description: movieResponseDescription.thumbnailDescription,
      example: movieResponseDescription.thumbnailExample,
    }),
  owner: z.string().meta({
    description: movieResponseDescription.ownerDescription,
    example: movieResponseDescription.ownerExample,
  }),
  movieId: z.number().meta({
    description: movieResponseDescription.movieIdDescription,
    example: movieResponseDescription.movieIdExample,
  }),
  nameRU: z.string().meta({
    description: movieResponseDescription.nameRUDescription,
    example: movieResponseDescription.nameRUExample,
  }),
  nameEN: z.string().meta({
    description: movieResponseDescription.nameENDescription,
    example: movieResponseDescription.nameENExample,
  }),
})

export const moviesResponseSchema = z.array(movieResponseSchema)

export type TAddMovieBodyDto = z.infer<typeof addMovieBodySchema>
export type TAddMovieDto = z.infer<typeof addMovieSchema>
export type TMovieResponseDto = z.infer<typeof movieResponseSchema>
export type TMoviesResponseDto = z.infer<typeof moviesResponseSchema>
export type TDeleteMovieParamsDto = z.infer<typeof deleteMovieSchema>
