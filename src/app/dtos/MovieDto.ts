import validator from 'validator'
import z from 'zod'

import { movieResponseDescription } from '@app/constants/responses-descriptions.js'
import VALIDATION_RESPONSE from '@app/constants/validation-responses.js'

import { authResponseSchema } from './AuthDto.js'

const { image, trailer, thumbnail } = VALIDATION_RESPONSE

export const moviesResponseSchema = z.array(
  z.object({
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
    owner: authResponseSchema,
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
  }),
)

export type TMoviesResponseDto = z.infer<typeof moviesResponseSchema>
