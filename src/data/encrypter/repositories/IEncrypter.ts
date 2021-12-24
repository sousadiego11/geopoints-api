export interface IEncrypter {
  hashPassword(): Promise<string>;
}
