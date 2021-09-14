/* eslint-disable no-redeclare */
export interface ILoginUser {
  loginUser(): Promise<any>
}

export namespace ILoginUser {
  export type Request = {
    email: string
    password: string
  }
}
