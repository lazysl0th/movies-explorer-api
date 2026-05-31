export interface IUserData {
  id: string
  email: string
  name: string
}

export default class User {
  public readonly id: string

  #email: string

  #name: string

  constructor({ id, name, email }: IUserData) {
    this.id = id
    this.#name = name
    this.#email = email
  }

  get email(): string {
    return this.#email
  }

  get name(): string {
    return this.#name
  }

  public changeEmail(email: string): void {
    this.#email = email
  }

  public changeName(name: string): void {
    this.#name = name
  }

  public toJSON(): object {
    return {
      _id: this.id,
      email: this.#email,
      name: this.#name,
    }
  }
}
