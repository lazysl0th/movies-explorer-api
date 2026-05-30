export const API_PREFIX = '/v1'

type TRoutesMap = {
  [K in keyof typeof BASE_ROUTES]: Record<keyof (typeof API_ROUTES)[K], string>
}

export const BASE_ROUTES = {
  auth: '/auth',
  doc: '/api-docs',
  users: '/users',
  movies: '/movies',
} as const

export const API_ROUTES = {
  auth: {
    signin: '/signin',
    signup: '/signup',
    signout: '/signout',
  },
  doc: {},
  users: {
    me: '/me',
  },
  movies: {
    '/': '/',
    '/:movieId': '/:movieId',
  },
} as const

export const FULL_API_ROUTES = {
  auth: {
    signin: `${BASE_ROUTES.auth}${API_ROUTES.auth.signin}`,
    signup: `${BASE_ROUTES.auth}${API_ROUTES.auth.signup}`,
    signout: `${BASE_ROUTES.auth}${API_ROUTES.auth.signout}`,
  },
  doc: {},
  users: {
    me: `${BASE_ROUTES.users}${API_ROUTES.users.me}`,
  },
  movies: {
    '/': `${BASE_ROUTES.movies}${API_ROUTES.movies['/']}`,
    '/:movieId': `${BASE_ROUTES.movies}${API_ROUTES.movies['/:movieId']}`,
  },
} as const satisfies TRoutesMap
