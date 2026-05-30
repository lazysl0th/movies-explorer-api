export default class Email {
  #value: string

  constructor(value: string) {
    this.#value = value
  }

  get value(): string {
    return this.#value
  }

  change(email: string): void {
    this.#value = email
  }
}
