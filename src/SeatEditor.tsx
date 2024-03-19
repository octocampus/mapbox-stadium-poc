import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom"
import { supabaseClient } from "./createClient";
import Map, { Layer, MapRef, Source, useMap, MapEvent, MapProvider } from 'react-map-gl/maplibre'
import { MapLayerEventType, MapLayerMouseEvent } from "maplibre-gl";
import { MapWheelEvent } from "react-map-gl";

const camDefault = {
    center: [-121.968438, 37.371627],
    zoom: 15.4,
    pitch: 0,
    bearing: 0
};

export default function SeatEditor() {
    const { eventId } = useParams();
    const [geodata, setGeoData] = useState({
        type: 'FeatureCollection',
        features: [
            { type: 'Feature', geometry: { type: 'Point', coordinates: [-122.4, 37.8] } }
        ]
    });

    const [cameraPosition, setCamPos] = useState(camDefault);

    const [currTribune, setCurrTribune] = useState(null);


    async function fetchVenue() {
        const { data } = await supabaseClient.from('venues').select('venue_geojson').eq('id', 1);
        setGeoData(data[0].venue_geojson);
    }

    useEffect(() => {
        fetchVenue();
    }, []);

    const handleClick = (ev: MapLayerMouseEvent) => {
        if (ev.features?.length == 0) {
            return;
        }

        setCamPos({...cameraPosition,center:[ev.lngLat.lng,ev.lngLat.lat]})

        setCurrTribune(ev.features[0].properties.tribuneId)
    }


    function Navigation({ cameraPosition }) {
        const { currmap } = useMap();

        useEffect(() => {
            currmap?.flyTo(cameraPosition);
        }, [])

        return (
            <h1 className="hidden" >Hack to be able to fly to a position</h1>
        )
    }

    function Inspector({ currTribune }) {
        const [avseats, setAvseats] = useState(null);
        const [price, setPrice] = useState(null);

        const fetchSeats = async () => {
            if (!currTribune) {
                return;
            }
            const {data, error } = await supabaseClient
                .from('seats')
                .select('*')
                .eq('event', eventId)
                .eq('tribuneId', currTribune);

            if (data?.length == 0) {
                return;
            }
            
            setAvseats(data[0].available_seats)
            setPrice(data[0].price)
        }

        useEffect(() => {
            fetchSeats()
        }, [])

        const handleSeats = (e) => {
            setAvseats(e.target.value);
        }

        const handlePrice = (e) => {
            setPrice(e.target.value);
        }


        async function insertOrUpdateSeat(eventId, tribuneId, availableSeats, price) {
            try {
                // Check if a row with the specified eventId and tribuneId exists
                const { data: existingSeatData, error: existingSeatError } = await supabaseClient
                    .from('seats')
                    .select('*')
                    .eq('event', eventId)
                    .eq('tribuneId', tribuneId);

                if (existingSeatError) {
                    throw existingSeatError;
                }

                // If a row already exists, update it
                if (existingSeatData && existingSeatData.length > 0) {
                    const existingSeatId = existingSeatData[0].id;
                    const { data: updatedSeatData, error: updateError } = await supabaseClient
                        .from('seats')
                        .update({ available_seats: availableSeats, price: price })
                        .eq('id', existingSeatId);

                    if (updateError) {
                        throw updateError;
                    }

                    console.log('Updated seat data:', updatedSeatData);
                    return updatedSeatData;
                }

                // If no row exists, insert a new row
                const { data: insertedSeatData, error: insertError } = await supabaseClient
                    .from('seats')
                    .insert([{ event: eventId, tribuneId: tribuneId, available_seats: availableSeats, price: price }]);

                if (insertError) {
                    throw insertError;
                }

                console.log('Inserted seat data:', insertedSeatData);
                return insertedSeatData;
            } catch (error) {
                console.error('Error inserting or updating seat:', error.message);
                return null;
            }
        }


        const handleSave = async () => {
            try {
                // Call insertOrUpdateSeat function to insert or update seat data
                const seatData = await insertOrUpdateSeat(eventId, currTribune, avseats, price);
                
            } catch (error) {
                // Handle error
                console.error('Error saving seat data:', error.message);
            }
        };


        return (
            <div className="absolute right-10 top-10 max-w-sm p-6 min-w-80 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                {!currTribune && <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Cliquer sur une tribune</h5>
                </a>}
                {currTribune && <div className="flex flex-col dark:text-white">
                    <div className="p-10">
                        <div className="mb-6">
                            <label htmlFor="tribune Id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tribune Id:</label>
                            <input disabled readOnly value={currTribune} type="tribune Id" id="tribune Id" className="bg-gray-50  text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="Event Name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Available seats:</label>
                            <input type="number" onChange={handleSeats} value={avseats} id="Event Name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="Event Date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">price:</label>
                            <input type="number" onChange={handlePrice} value={price} id="Event Date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                    </div>
                    <button type="button" onClick={handleSave} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>

                </div>}

            </div>
        )
    }

    return (
        <>
            <MapProvider>
                <Map
                    id="currmap"
                    initialViewState={{
                        longitude: -121.968438,
                        latitude: 37.371627,
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
                <Inspector currTribune={currTribune} />
            </MapProvider>
        </>
    )
}