export const API_PREFIX = '/v1'

type TRoutesMap = {
  [K in keyof typeof BASE_ROUTES]: Record<keyof typeof AUTH_ROUTES, string>
}

const BASE_ROUTES = {
  auth: '/auth',
} as const

export const AUTH_ROUTES = {
  signin: '/signin',
} as const

export const API_ROUTES = {
  auth: {
    signin: `${BASE_ROUTES.auth}${AUTH_ROUTES.signin}`,
  },
} as const satisfies TRoutesMap
