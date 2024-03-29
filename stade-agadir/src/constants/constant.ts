import {
  BackgroundLayer,
  SymbolLayer,
  FillLayer,
  LineLayer,
} from "react-map-gl";
import { InitalMapState } from "../utils/interfaces";
import { IStadiumObject } from "../utils/interfaces/map/IStadiumObject";
import adrarJson from "../data/adrar.json";
import { EStadiumIds } from "../utils/interfaces/map/EStadiumIds";
import { IMapLayer } from "../utils/interfaces/map/IMapLayer";
import { IMapSource } from "../utils/interfaces/map/IMapSource";
import { IStadiumMapSource } from "../utils/interfaces/map/IStudiumMapSource";
import { IMapCamera } from "../utils/interfaces/map/IMapCamera";
export const styleLibre = {
  width: "100wh",
  height: "100vh",
  backgroundColor: "EDEFF5",
};
export const styleMap: string =
  "https://api.maptiler.com/maps/streets/style.json?key=iiFeGmvBxqCn4UG9a3K0";
export const initialMapState: InitalMapState = {
  longitude: -121.96,
  latitude: 37.35,
  zoom: 15,
};
export const tribuneSymbolLayer: SymbolLayer = {
  id: "symbol-layer",
  type: "symbol",
  source: "stadium",
  layout: {
    "text-field": ["concat", "z", ["get", "tribuneId"]],
    "text-font": ["Poppins", "Arial Unicode MS Bold"],
    "text-size": 12,
    "text-transform": "uppercase",
    "text-letter-spacing": 0.05,
    "text-offset": [0, 1.5],
  },
  paint: {
    "text-color": "#4D4D4D",
    "text-halo-color": "#fff",
    "text-halo-width": 2,
  },
  filter: ["==", "type", "tribune"],
};

export const seatFillLayer: FillLayer = {
  id: "seat",
  source: "stadium",
  filter: ["==", "type", "seat"],
  type: "fill",
  paint: {
    "fill-color": [
      "case",
      ["==", ["get", "isAvailable"], 1],
      "#A9A9A9",
      ["==", ["get", "isAvailable"], 0],
      "#3A9012",
      "#A9A9A9",
    ],
  },
};

export const seatLineLayer: LineLayer = {
  id: "seat-line",
  source: "stadium",
  filter: ["==", "type", "seat"],
  type: "line",
  paint: {
    "line-color": "#FFFFFF",
    "line-width": 4,
  },
};

export const tribuneFillLayer: FillLayer = {
  id: "tribune",
  source: "stadium",
  filter: ["==", "type", "tribune"],
  type: "fill",
  paint: {
    // the fill color will be depends on switch case
    "fill-color": [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      "#B2FFD1",
      "#e7e6e8",
    ],
  },
};

export const tribuneLineLayer: LineLayer = {
  id: "tribune-line",
  source: "stadium",
  filter: ["==", "type", "tribune"],
  type: "line",
  paint: {
    "line-color": "#AFAEB0",
    "line-width": 2,
  },
};
export const stadiumOutlineLineLayer: LineLayer = {
  id: "stadium-outline",
  source: "stadium",
  filter: ["==", "type", "stadium-outline"],
  type: "line",
  paint: {
    "line-color": "#FFFFFF",
    "line-width": 2,
  },
};
export const fieldFillLayer: FillLayer = {
  id: "field",
  source: "stadium",
  filter: ["in", "type", "stadium-field-light", "stadium-field-dark"],
  type: "fill",
  paint: {
    // the fill color will be depends on switch case
    "fill-color": [
      "case",
      ["==", ["get", "type"], "stadium-field-light"],
      "#78924A",
      ["==", ["get", "type"], "stadium-field-dark"],
      "#5F783A",
      "#A9A9A9",
    ],
  },
};

export const baseStadiumFillLayer: FillLayer = {
  id: "stadium-base",
  source: "stadium",
  filter: ["==", "type", "stadium-base"],
  type: "fill",
  paint: {
    // the fill color will be depends on switch case
    "fill-color": "#E7E6E8",
    "fill-opacity": 0.5,
  },
};
export const bgStadiumFillLayer: FillLayer = {
  id: "bg-stadium",
  source: "stadium",
  filter: ["==", "type", "bg-stadium"],
  type: "fill",
  paint: {
    "fill-color": "#FFFFFF",
  },
};
export const bgStadiumLineLayer: LineLayer = {
  id: "bg-stadium-line",
  source: "stadium",
  filter: ["==", "type", "bg-stadium"],
  type: "line",

  paint: {
    "line-color": "#AFAEB0",
    "line-width": 10,
  },
};
export const stadiumBackgroundLayer: BackgroundLayer = {
  id: "background-map",
  type: "background",
  paint: {
    "background-color": "#EDEFF5",
  },
};
export const stadiumData: IStadiumObject = {
  geojson: adrarJson,
  id: "1",
  name: "Adrar Stadium",
};


export const layers: IMapLayer[] = [
  { layer: tribuneSymbolLayer },
  { layer: seatFillLayer, beforeId: EStadiumIds.TRIBUNE_SYMBOL },
  { layer: seatLineLayer, beforeId: EStadiumIds.SEAT },
  { layer: tribuneFillLayer, beforeId: EStadiumIds.SEAT_LINE },
  { layer: tribuneLineLayer, beforeId: EStadiumIds.TRIBUNE },
  { layer: stadiumOutlineLineLayer, beforeId: EStadiumIds.TRIBUNE_LINE },
  { layer: fieldFillLayer, beforeId: EStadiumIds.STADIUM_OUTLINE },
  { layer: baseStadiumFillLayer, beforeId: EStadiumIds.FIELD },
  { layer: bgStadiumFillLayer, beforeId: EStadiumIds.STADIUM_BASE },
  { layer: bgStadiumLineLayer, beforeId: EStadiumIds.BG_STADIUM },
  { layer: stadiumBackgroundLayer, beforeId: EStadiumIds.BG_STADIUM_LINE },
];

export const sources: IMapSource[] = [
  { id: "stadium", type: "geojson", data: adrarJson, layers: layers },
];

export const stadiumMapSource: IStadiumMapSource = {
  name: "Adrar Stadium",
  initialMapState: {
    longitude: -121.967188,
    latitude: 37.371524,
    zoom: 15,
  },
  
  sourcePrimary:"stadium",
  sources: sources,
  isInteractive: true,
  interactiveLayerIds: ["tribune"],
};

export const defaultCameraZoom: IMapCamera = {
  zoom: 15,
  bearing: 0,
  pitch: 0,
  duration: 2000,
};
export const tribuneCameraZoom: IMapCamera = {
  bearing: 120,
  zoom: 18.5,
  pitch: 50,
  duration: 2000,
};
