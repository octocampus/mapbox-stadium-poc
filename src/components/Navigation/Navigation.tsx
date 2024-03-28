import {useMap} from "react-map-gl/maplibre";
import {useEffect} from "react";

export function Navigation({ cameraPosition } : { cameraPosition:any}) {
    const { currmap } = useMap();

    useEffect(() => {
        currmap?.flyTo(cameraPosition);
    }, [cameraPosition, currmap])

    return (
        <h1 className="hidden" >fly to a position</h1>
    )
}