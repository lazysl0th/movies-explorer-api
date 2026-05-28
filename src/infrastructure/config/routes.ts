export const API_PREFIX = '/v1'

type TRoutesMap = {
  [K in keyof typeof BASE_ROUTES]: Record<keyof (typeof API_ROUTES)[K], string>
}

export const BASE_ROUTES = {
  auth: '/auth',
  doc: '/api-docs',
  users: '/users',
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
} as const satisfies TRoutesMap
