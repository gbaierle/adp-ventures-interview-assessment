export default class IncorrectResultException extends Error {
  constructor(message: string) {
    super(message);
  }
}
