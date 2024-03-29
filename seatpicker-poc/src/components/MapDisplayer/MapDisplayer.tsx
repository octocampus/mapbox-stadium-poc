import Map from "react-map-gl/maplibre";
import {MapLayerMouseEvent} from "react-map-gl/maplibre";
import {ReactNode} from "react";
import {StyleSpecification} from "maplibre-gl";


export function MapDisplayer({
            id,
            styleSpec,
            interactiveLayerIds,
            handleOnMouseDown,
            children
        }
            :
        {
            id : string
            styleSpec: string | StyleSpecification,
            interactiveLayerIds? : string[],
            handleOnMouseDown? : (e: MapLayerMouseEvent) => void,
            children? : ReactNode
        }){
    return (
        <>
            <Map
                initialViewState={{
                    longitude: -121.9682,
                    latitude: 37.3713,
                    zoom: 15
                }}
                id={id}
                style={{width: "100%", height: "100vh"}}
                onMouseDown={handleOnMouseDown}
                interactive={true}
                interactiveLayerIds={interactiveLayerIds}
                mapStyle={styleSpec}
            >
                {children}
            </Map>
        </>
    );
}