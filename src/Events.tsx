import { useState, useEffect } from "react";
import { supabaseClient } from "./createClient";
import { Link } from "react-router-dom";
import EventFormModal from "./components/EventFormModal";

export default function Events(){

    const [events,setEvents] = useState<any>([]);
	
	async function fetchEvents() {
		const {data} : any= await supabaseClient.from('events').select('*');
		setEvents(data);
	}

	useEffect(()=>{
		fetchEvents();
	},[])

    return (
        <div>
			<EventFormModal/>
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="px-6 py-3">
								Name
							</th>
							<th scope="col" className="px-6 py-3">
								Venue
							</th>
							<th scope="col" className="px-6 py-3">
								Date
							</th>
							<th scope="col" className="px-6 py-3">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{
							events.map((ev : any,index : any)=>{
								return (
									<tr key={index} className="bg-white dark:bg-gray-800">
							<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
								{ev.name}
							</th>
							<td className="px-6 py-4">
								{ev.venue}
							</td>
							<td className="px-6 py-4">
								{ev.date}
							</td>
							<td className="px-6 py-4">
								<Link to={"/events/"+ev.id} className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-900">View</Link>
								<Link to={"/seatedit/"+ev.id} className="focus:outline-none text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-orange-900">Edit</Link>
									
							</td>
						</tr>
								)
							})
						}
						
					</tbody>
				</table>
			</div>
    )
}