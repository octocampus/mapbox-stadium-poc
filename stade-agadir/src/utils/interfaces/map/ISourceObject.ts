import { GeoJSONSource } from "react-map-gl";

export interface ISourceObject {
    id:String;
    type:String;
    data:GeoJSONSource;
}