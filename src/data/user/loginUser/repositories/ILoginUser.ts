/* eslint-disable no-redeclare */
export interface ILoginUser {
  loginUser(): Promise<ILoginUser.Response>
}

export namespace ILoginUser {
  export type Request = {
    email: string
    password: string
  }
  export type Response = {
    token: string
    id: number
  }
}
