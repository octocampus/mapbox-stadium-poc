import {ChangeEvent, useEffect, useState} from "react";
import {InteractiveSeatMap} from "./components/InteractiveSeatMap";
import {DefaultStyleLayer} from "./components/DefaultStyleLayer";
import {MapGeoJSONFeature, StyleSpecification} from "maplibre-gl";
import {UploadMap} from "./components/UploadMap";
import {Layer} from "react-map-gl/maplibre";

type Seat = {
    code:string
    price: number,
    solde: boolean,
    updatedAt: Date
}

export default function App() {
    const [styleSpec, setStyleSpec] = useState<string | StyleSpecification>()
    const [seats, setSeats] = useState<{ [key: string]: Seat }>({})
    const [currSeat, setCurrSeat] = useState<Seat | undefined | null>(null)
    const [seatId,setSeatId] = useState<string>()

    const handleOnSeatClick = (feature: MapGeoJSONFeature) => {
        const Id = feature.properties.id;
        const seat = seats[Id];
        console.log("on click:",seat)
        setCurrSeat(seat);
        setSeatId(Id)
    }

    useEffect(() => {
        if (currSeat === undefined) {
            console.log("seat not available")
            console.log("object",seats)
        } else {
            console.log(currSeat)
        }
    }, [currSeat])

    function handleChangeCode(e : ChangeEvent<HTMLInputElement>) {
        const codeval = e.target.value;
        // @ts-expect-error
        setCurrSeat({code:codeval,price:currSeat?.price,updatedAt:new Date(), solde:false})
    }

    function handleChangePrice(e : ChangeEvent<HTMLInputElement>) {
        const priceval = e.target.value;
        // @ts-expect-error
        setCurrSeat({code:currSeat?.code,price:priceval,updatedAt:new Date(), solde:false})
    }

    function handleToggleSolde() {
        // @ts-ignore
        setCurrSeat({code:currSeat?.code,price:currSeat?.price,updatedAt:new Date(), solde:true})
        // @ts-ignore
        setSeats(prevState => ({...prevState,[seatId]:currSeat}))
    }

    return (
        <div className=" flex flex-row">

            <div className="w-[70vw]">
                <InteractiveSeatMap
                    styleSpec={styleSpec || "defaultMap.json"}
                    handleOnSeatClick={handleOnSeatClick}
                >
                    <DefaultStyleLayer/>
                    <Layer {...{
                        type:"fill",
                        source : "svg",
                        filter : ["in","id",...Object.keys(seats)],
                        paint: {
                            'fill-color':"#3eab24"
                        },
                        minzoom:17.3
                    }}/>
                </InteractiveSeatMap>
            </div>
            <div className=" w-[30vw] min-h-72 p-2 ">
                <UploadMap setStyleSpec={setStyleSpec}/>
                {currSeat !== null &&
                    <div className="flex flex-col m-2 p-4 bg-gray-400 rounded-lg shadow-2xl">
                        <div>
                            <div>
                                <label htmlFor="Seat code"
                                       className="block mb-2 text-sm font-medium text-gray-900 ">Seat
                                    code:</label>
                                <input type="text" onChange={handleChangeCode} value={currSeat?.code || ""} id="Seat code"
                                       readOnly={currSeat?.solde}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                       required/>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="Seat price"
                                       className="block mb-2 text-sm font-medium text-gray-900">Seat price:</label>
                                <input type="number" onChange={handleChangePrice} value={currSeat?.price || 0}
                                       id="Seat price"
                                       readOnly={currSeat?.solde}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                       required/>
                            </div>
                            <div className="mb-6">
                                <span
                                    className="block mb-2 text-sm font-medium text-gray-900">last updated: {currSeat?.updatedAt.toString()}</span>
                                <span
                                    className="block mb-2 text-md text-green-600 text-center font-bold ">{currSeat?.solde && "Available"}</span>

                            </div>


                        </div>
                        <button type="button" onClick={handleToggleSolde} disabled={currSeat?.solde}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                            {!currSeat?.solde ? "Add" : "Buy"}
                        </button>

                    </div>}
            </div>
        </div>

    );

}

