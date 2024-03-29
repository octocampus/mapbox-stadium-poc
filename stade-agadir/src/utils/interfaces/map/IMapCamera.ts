import { LngLatLike } from "maplibre-gl";

export interface IMapCamera {
    center?:LngLatLike;
    zoom: number;
    bearing: number;
    pitch: number;
    duration: number;
  }