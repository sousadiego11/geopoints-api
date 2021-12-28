/* eslint-disable no-unused-vars */
export type ValidatorResponse = {
  isValidPassword: boolean
  email: string
  id: number
}
export interface IEncrypter {
  hashPassword(): Promise<string>;
  validatePassword(userPassword: string): Promise<ValidatorResponse>;
}
