import { MapDisplayer } from "../MapDisplayer/";
import {
  styleMap,
  styleLibre,
  defaultCameraZoom,
  tribuneCameraZoom,
} from "../../constants";
import { Source } from "react-map-gl/maplibre";
import React, { useCallback, useState } from "react";
import {
  Layer,
  MapLayerMouseEvent,
  MapRef,
  MapboxGeoJSONFeature,
} from "react-map-gl";
import { IStadiumMapSource } from "../../utils/interfaces/map/IStudiumMapSource";
import { EStadiumIds } from "../../utils/interfaces/map/EStadiumIds";
interface StadiumDislayerProps {
  stadiumMapSource: IStadiumMapSource;
}

export const StadiumDisplayer = ({
  stadiumMapSource,
}: StadiumDislayerProps) => {
  const { sources, interactiveLayerIds, isInteractive, initialMapState, name ,sourcePrimary} =
    stadiumMapSource;
  const [selectedFeature, setSelectedFeature] = useState<MapboxGeoJSONFeature>();

  const refMap = React.useRef<MapRef>(null);



  const onTribuneClick = (event: MapLayerMouseEvent) => {
    navigateToTribune(event);
    if (!event.features || event.features.length === 0) {
      return;
    }
    setSelectedFeature(event.features[0]);
    console.log("prev ", selectedFeature);
    console.log("enter", event.features[0]);

    resetHoverFeature(selectedFeature!);
    activeHoverFeature(event.features[0]);
    
    
  };
  const resetHoverFeature = (feature: any) => {
    if (!feature || !refMap.current) {
      return;
    }
    refMap.current.setFeatureState(
      {
        source:  sourcePrimary,
        id: feature.id,
      },
      { hover: false }
    );
  };
  const activeHoverFeature = (feature: any) => {
    if (!feature || !refMap.current) {
      return;
    }
    refMap.current.setFeatureState(
      {
        source: sourcePrimary,
        id: feature.id,
      },
      { hover: true }
    );
  };
  const navigateToTribune = useCallback((event: MapLayerMouseEvent) => {
    const { lngLat } = event;
    if (!event.features) return;
    const feature = event.features[0];
    console.log(feature);
    if (!feature) {
      refMap.current?.flyTo({
        center: lngLat,
        ...defaultCameraZoom,
      });
      return;
    }
    const featureType = feature.properties!.type;
    if (featureType === EStadiumIds.TRIBUNE) {
      refMap.current?.flyTo({
        center: lngLat,
        ...tribuneCameraZoom,
      });
    }
  }, []);

  return (
    <>
      <h1>{name}</h1>
      <MapDisplayer
        forwardRefMap={refMap}
        initialViewState={initialMapState}
        styleMap={styleMap}
        style={styleLibre}
        interactiveLayerIds={interactiveLayerIds}
        isInteractive={isInteractive}
        onMapClicked={onTribuneClick}
        onMapMouseLeave={(e) => console.log(e.lngLat)}
      >
        {
          <React.Fragment>
            {sources.map((source) => {
              return (
                <Source
                  key={source.id}
                  id={source.id}
                  type={source.type}
                  data={source.data}
                >
                  {source.layers.map((layer) => {
                    return (
                      <Layer
                        key={layer.layer.id}
                        {...layer.layer}
                        beforeId={layer.beforeId}
                      />
                    );
                  })}
                </Source>
              );
            })}
          </React.Fragment>
        }
      </MapDisplayer>
    </>
  );
};
/*
 <StadiumLayers />*/
