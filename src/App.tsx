import { useEffect, useState } from "react";
import {supabaseClient } from "./createClient"


export default function App() {

	const [events,setEvents] = useState([]);
	
	async function fetchEvents() {
		const {data} = await supabaseClient.from('events').select('*');
		setEvents(data);
	}

	useEffect(()=>{
		fetchEvents();
	},[])

	return (
		<div className="container max-w-2xl mx-auto">
			
			<div className=" ">
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
							events.map((ev,index)=>{
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
								<button type="button" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-900">View</button>
							</td>
						</tr>
								)
							})
						}
						
					</tbody>
				</table>
			</div>
			<div /></div>
	);

};

