const VALIDATION_MESSAGES = {
  name: {
    tooShort: 'Name must be at least 1 characters long',
    tooLong: 'Name must be at least 30 characters short',
    description: 'Name of the user',
    example: 'John',
  },
  email: {
    invalidFormat: 'Incorrect email format',
    description: 'User email address used for authentication',
    example: 'john@example.com',
  },
  password: {
    validate:
      'Password must be at least 8 characters long and include uppercase and lowercase letters, numbers, and special characters.',
    description: 'Secure user password',
    example: 'Secret_Password123',
  },
  auth: {
    idDescription: 'Unique identifier of the authenticated user',
    idExample: '65cb3d4f1a2b3c4d5e6f7a8b',
    emailDescription: 'Verified email address associated with the account',
    emailExample: 'john@example.com',
    nameDescription: 'Name of the user',
    nameExample: 'John',
  },
  token: {
    required: 'JWT token cookie is missing',
    invalidFormat: 'Token must be a string',
    description: 'Authentication token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  },
} as const

export default VALIDATION_MESSAGES
