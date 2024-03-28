import {MapProvider} from "react-map-gl";
import {MapDisplayer} from "../MapDisplayer";
import {Navigation} from "../Navigation";
import {ReactNode, useState} from "react";
import {MapLayerMouseEvent} from "react-map-gl/maplibre";
import {MapGeoJSONFeature, StyleSpecification} from "maplibre-gl";

const camDefault = {
    center: [-121.968438, 37.371627],
    zoom: 15.5,
    pitch: 0,
    bearing: 0
};

export function InteractiveSeatMap(
        {children, styleSpec, handleOnSeatClick}
        :
        { children?: ReactNode, styleSpec: string | StyleSpecification, handleOnSeatClick? : (feature : MapGeoJSONFeature) => void }) {

    const [camPos, setCamPos] = useState<object>(camDefault)

    function handleOnMouseDown(ev: MapLayerMouseEvent) {

        if (ev.features?.length == 0) {
            return;
        }
        setCamPos({
            center: [ev.lngLat.lng, ev.lngLat.lat],
            bearing: 130,
            zoom: 19,
            pitch: 50,
            duration: 3000,
        })

        if(ev.features?.length == 2 && handleOnSeatClick){
            handleOnSeatClick(ev.features[0]);
        }
    }


    function handleZoumOut() {
        setCamPos(camDefault)
    }

    return (
        <div className="w-full relative">
            <MapProvider>
                <MapDisplayer
                    id={"currmap"}
                    styleSpec={styleSpec}
                    handleOnMouseDown={handleOnMouseDown}
                    interactiveLayerIds={["grandstand","seat"]}
                >
                    {children}
                </MapDisplayer>
                {camPos && <Navigation cameraPosition={camPos}/>}
            </MapProvider>
            <button type="button"
                    className=" absolute top-0 right-0 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 m-2"
                    onClick={handleZoumOut}
            >
                Zoom Out
            </button>
        </div>
    )
}