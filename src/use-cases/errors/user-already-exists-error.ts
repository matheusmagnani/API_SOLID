export class UserAlreadyExistsError extends Error {
  constructor(){
    super('Email exists already');
  }
}