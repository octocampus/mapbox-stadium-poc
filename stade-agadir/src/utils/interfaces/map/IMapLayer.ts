import {
    BackgroundLayer,
    SymbolLayer,
    FillLayer,
    LineLayer,
  } from "react-map-gl";
export interface IMapLayer {
    layer: FillLayer | LineLayer | SymbolLayer | BackgroundLayer;
    beforeId?: string;
  }