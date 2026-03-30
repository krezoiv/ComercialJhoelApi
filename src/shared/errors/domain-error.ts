export class DomainError extends Error {
  readonly isDomainError = true;

  constructor(message: string) {
    super(message);

    this.name = new.target.name;

    Object.setPrototypeOf(this, new.target.prototype);

    // 🔥 esto ayuda a ESLint
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
