const VALIDATION_MESSAGES = {
  EMAIL: {
    invalidFormat: 'Incorrect email format',
    description: 'User email address used for authentication',
    example: 'qwerty@qwerty.com',
  },
  PASSWORD: {
    tooShort: 'Password must be at least 8 characters long',
    description: 'Secure user password',
    example: 'Secret_Password123',
  },
  AUTH: {
    idDescription: 'Unique identifier of the authenticated user',
    idExample: '65cb3d4f1a2b3c4d5e6f7a8b',
    emailDescription: 'Verified email address associated with the account',
    emailExample: 'qwerty@qwerty.com',
    nameDescription: 'Name of the user',
    nameExample: 'John',
  },
} as const

export default VALIDATION_MESSAGES
