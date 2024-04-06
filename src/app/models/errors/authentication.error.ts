export class AuthenticationError extends Error {
  constructor() {
    super('Device not authenticated');
  }
}
