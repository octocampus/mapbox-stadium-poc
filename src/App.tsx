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
   dragPan={false} 
   maxZoom={9}
  minZoom={7}
  initialViewState={{
    longitude: -4.671,
    latitude: 32.6,
  }}
  style={{width: 600, height: 400}}
    mapStyle="/public/osm_liberty.json"
  >
    <Source id="my-data" type="geojson" data={geojson}>
      <Layer {...layerStyle} />
    </Source>
  </Map>;
}

export default App
