import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { supabaseClient } from "./createClient";
import Map, { Layer,  Source, useMap,  MapProvider } from 'react-map-gl/maplibre'
import { MapLayerMouseEvent } from "maplibre-gl";
import GrandstandSeatList from "./components/GrandsrandSeatList";



export default function SeatPicker() {
    const camDefault = {
        center: [-121.968438, 37.371627],
        zoom: 15,
        pitch: 0,
        bearing: 0
    };
    const [geodata, setGeoData] = useState<any>({
        type: 'FeatureCollection',
        features: [
            { type: 'Feature', geometry: { type: 'Point', coordinates: [-122.4, 37.8] } }
        ]
    });
    const [cameraPosition, setCamPos] = useState<any>(camDefault);
    const [grandstandId,setGrandstandId] = useState<any>();

    async function fetchVenue() {
        const { data } = await supabaseClient.from('venues').select('venue_geojson').eq('id', 1);
        if(!data)
            return;
        setGeoData(data[0].venue_geojson);
    }


    useEffect(() => {
        fetchVenue();
    }, []);

    const handleClick = (ev: MapLayerMouseEvent) => {

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
        if(!ev.features)
            return;
        const id = ev.features[0].properties.tribuneId;
        setGrandstandId(id);
    }


    function Navigation({ cameraPosition } : any) {
        const { currmap } = useMap();

        useEffect(() => {
            currmap?.flyTo(cameraPosition);
        }, [])

        return (
            <h1 className="hidden" >Hack to be able to fly to a position</h1>
        )
    }

    const handleOnGoBack = ()=>{
        setCamPos(camDefault); setGrandstandId(undefined)
    }

    return (
        <>
            <MapProvider>
                <Map
                    id="currmap"
                    initialViewState={{
                        longitude: -121.96,
                        latitude: 37.35,
                        zoom: 15
                    }}
                    style={{ width: "100wh", height: "100vh" }}
                    interactive={true}
                    interactiveLayerIds={["tribune"]}
                    onMouseDown={handleClick}
                >
                    <Source id="stadium" type="geojson" data={geodata}>
                        <Layer id="tribune" {
                            ...{
                                filter: ['==', 'type', 'tribune'],
                                type: 'fill',
                                paint: {
                                    "fill-color": "#e7e6e8"
                                }
                            }
                        } />
                        <Layer beforeId="tribune" id="stadium-line" {
                            ...{
                                type: 'line',
                                paint: {
                                    "line-color": ["get", "stroke"],
                                    "line-width": ["get", "stroke-width"],
                                }
                            }
                        } />
                        <Layer beforeId="stadium-line" id="stadium-fill" {
                            ...{

                                type: 'fill',
                                paint: {
                                    "fill-color": ["get", "fill"],
                                    "fill-opacity": ["get", "fill-opacity"],
                                }
                            }
                        } />
                    </Source>
                </Map>
                <Navigation cameraPosition={cameraPosition} />
                <GrandstandSeatList grandstandId={grandstandId} onClickGoback={handleOnGoBack} />
                
            </MapProvider>


        </>
    )
}