import * as React from 'react';
import Map, {Source, Layer} from 'react-map-gl/maplibre';
import type {CircleLayer} from 'react-map-gl/maplibre';
import type {FeatureCollection} from 'geojson';

const geojson: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {type: 'Feature', geometry: {type: 'Point', coordinates: [-122.4, 37.8]}}
  ]
};

const layerStyle: CircleLayer = {
  id: 'point',
  type: 'circle',
  paint: {
    'circle-radius': 10,
    'circle-color': '#007cbf'
  }
};

function App() {
  return <Map
  initialViewState={{
    longitude: -122.4,
    latitude: 37.8,
  }}
  style={{width: 600, height: 400}}
    mapStyle="https://api.maptiler.com/maps/basic-v2/style.json?key=rBdTDnsNuDCo2ea9nQ3G"
  >
    <Source id="my-data" type="geojson" data={geojson}>
      <Layer {...layerStyle} />
    </Source>
  </Map>;
}

export default App
