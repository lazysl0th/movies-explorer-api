import PasswordHash from '../value-objects/user/PasswordHash.js'

import type {
  THashComparerService,
  THashGeneratorService,
} from '@app/interfaces/services/IHashService.js'

interface ILocalCredentialsProps {
  id: string
  passwordHash: PasswordHash
}

interface IRestoreLocalCredentialsProps {
  id: string
  password: string
}

interface ICreateLocalCredentials {
  id: string
  password: string
  hashGenerateService: THashGeneratorService
}

export default class LocalCredentials {
  public readonly id: string

  #passwordHash: PasswordHash

  constructor({ id, passwordHash }: ILocalCredentialsProps) {
    this.id = id
    this.#passwordHash = passwordHash
  }

  get passwordHash(): string {
    return this.#passwordHash.value
  }

  public static async create({
    id,
    password,
    hashGenerateService,
  }: ICreateLocalCredentials): Promise<LocalCredentials> {
    const hashedPasswordString = await hashGenerateService.generate(password)
    const passwordHash = new PasswordHash(hashedPasswordString)

    return new LocalCredentials({ id, passwordHash })
  }

  public static restore({
    id,
    password,
  }: IRestoreLocalCredentialsProps): LocalCredentials {
    return new LocalCredentials({
      id,
      passwordHash: new PasswordHash(password),
    })
  }

  public async comparePassword(
    password: string,
    hashGenerateService: THashComparerService,
  ): Promise<boolean> {
    return hashGenerateService.compare(password, this.#passwordHash.value)
  }
}
