/* eslint-disable no-redeclare */

import { MarkerModel } from '../../../entities';

export interface ICreateMarker {
  create(): Promise<ICreateMarker.Response>;
}

export namespace ICreateMarker {
  export type Response = MarkerModel
}
