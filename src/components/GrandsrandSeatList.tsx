import { useParams } from "react-router-dom";
import { supabaseClient } from "../createClient";
import { useEffect, useState } from "react";


export default function GrandstandSeatList({ grandstandId, onClickGoback } : any) {
    const { eventId } = useParams<any>();
    const [features, setFeatures] = useState<any>();

    const fetchSeats = async (tribuneId :  any) => {
        if (!tribuneId) {
            return;
        }
        const { data } = await supabaseClient
            .from('seats')
            .select('*')
            .eq('event', eventId)
            .eq('tribuneId', tribuneId);

        if (!data) {
            return;
        }

        setFeatures({ available_seats: data[0].available_seats, price: data[0].price });
    }

    useEffect(()=>{
        fetchSeats(grandstandId);
    },[]);

    return (
        <div className="absolute right-10 top-10 max-w-sm p-6 min-w-80 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            {!features && <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Cliquer sur une tribune!</h5>
            </a>}
            {features && <div className="flex flex-col dark:text-white">
                <p className=" inline"><strong className=" font-extrabold">Available Seats : </strong> {features.available_seats}</p>
                <p className=" inline"><strong className=" font-extrabold">Price : </strong>{features.price}</p>
                <a href="#" onClick={onClickGoback} className="inline-flex mt-6 items-center w-40 px-3 py-2 text-sm font-medium text-center text-white bg-amber-500 rounded-lg hover:bg-amber-600 focus:ring-4 focus:outline-none focus:ring-blue-300">
                    Go back
                    <svg className=" w-3.5 h-3.5 ms-2" id="2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a>
            </div>}

        </div>
    )
}