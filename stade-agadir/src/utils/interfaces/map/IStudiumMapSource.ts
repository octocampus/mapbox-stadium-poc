import { IMapSource } from "./IMapSource";
import { InitalMapState } from "./InitialMapState";

export interface IStadiumMapSource {
    name: string;
    sources: IMapSource[];
    isInteractive: boolean;
    interactiveLayerIds: string[];
    initialMapState: InitalMapState;
    sourcePrimary:string;
  }