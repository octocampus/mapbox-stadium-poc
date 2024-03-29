
import React, { RefObject }  from "react";
import Map, {  MapProvider } from "react-map-gl/maplibre";
import { InitalMapState } from "../../utils/interfaces";
interface MapDisplayerProps {
    children:React.ReactElement;
  initialViewState: InitalMapState;
  styleMap?: string;
  isInteractive?: boolean;
  interactiveLayerIds?: string[];
  onMapClicked?:(event:any)=>void;
  onMapMouseMove?:(event:any)=>void;
  onMapMouseLeave?:(event:any)=>void;
  onMapMouseDown?:(event:any)=>void;

  style?: any;
  forwardRefMap?: RefObject<any>;
}


export const MapDisplayer =({ style, initialViewState, styleMap, interactiveLayerIds,onMapClicked,onMapMouseLeave,onMapMouseMove,forwardRefMap ,children,onMapMouseDown}:MapDisplayerProps)=>{
    
    return (
    <MapProvider>
        <Map
            ref={forwardRefMap}
            initialViewState={initialViewState}
            mapStyle={styleMap}
            style={{ ...style }}
            interactiveLayerIds={interactiveLayerIds}
            onClick={onMapClicked}
            onMouseMove={onMapMouseMove}
            onMouseDown={onMapMouseDown}
            onMouseLeave={onMapMouseLeave}
        >
            {children}
        </Map>
    </MapProvider>
  )
}

  
;
/*
const MapDisplayer = forwardRef<React.MutableRefObject<null>, MapDisplayerProps>((props, ref) =>
{
    const { styleMap,sources, layers, initialViewState, mapStyle, interactiveLayerIds,onMapClicked,onMapMouseLeave,onMapMouseMove } = props;
    return (
    <MapProvider>
        <Map
            ref={ref as LegacyRef<MapRef> | undefined}
            initialViewState={initialViewState}
            mapStyle={mapStyle}
            style={{ ...styleMap }}
            interactiveLayerIds={interactiveLayerIds}
            onMapClicked={onMapClicked}
            onMapMouseMove={onMapMouseMove}
            onMapMouseLeave={onMapMouseLeave}
        >
            {sources}
            {layers}
        </Map>
    </MapProvider>
  )
}

  );
;*/