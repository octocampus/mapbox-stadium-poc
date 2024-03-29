import {Layer} from "react-map-gl/maplibre";

export function DefaultStyleLayer() {
    return (
        <div>
            <Layer
                {...{
                    id: 'seat',
                    type: 'fill',
                    source: 'svg',
                    filter: ['==', 'class', 'seat'],
                    paint: {
                        'fill-color': '#507081',
                    },
                    minzoom : 17.3
                }}
            />
            <Layer
                {...{
                    beforeId: 'seat',
                    id: 'grandstand',
                    type: 'fill',
                    source: 'svg',
                    filter: ['==', 'class', 'grandstand'],
                    paint: {
                        'fill-color': '#e7e6e8',
                    }
                }}
            />
            <Layer
                {...{
                    beforeId:'grandstand',
                    id: 'field',
                    type: 'fill',
                    source: 'svg',
                    filter: ['==', 'class', 'field'],
                    paint: {
                        'fill-color': '#237507',
                        'fill-opacity' : 0.7
                    }
                }}
            />
            <Layer
                {...{
                    beforeId:'field',
                    id: 'stadium',
                    type: 'fill',
                    source: 'svg',
                    filter: ['==', 'class', 'stadium'],
                    paint: {
                        'fill-color': '#BBBBBB',
                    }
                }}
            />
            <Layer
                {...{
                    beforeId:'stadium',
                    id: 'bg',
                    type: 'background',
                    paint: {
                        'background-color' :"#888888"
                    }

                }}
            />
        </div>
    )
}