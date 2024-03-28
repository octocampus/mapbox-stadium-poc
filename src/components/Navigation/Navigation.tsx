import {useMap} from "react-map-gl";
import {useEffect} from "react";
import {FlyToOptions} from "maplibre-gl";

export function Navigation({ cameraPosition } : any) {
    const { currmap } = useMap();

    useEffect(() => {
        currmap?.flyTo(cameraPosition);
    }, [])

    return (
        <h1 className="hidden" >Hack to be able to fly to a position</h1>
    )
}