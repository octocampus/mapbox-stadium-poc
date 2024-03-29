import { IMapLayer } from "./IMapLayer";

export interface IMapSource {
    id: string;
    type: any;
    data: any;
    layers: IMapLayer[];
  }