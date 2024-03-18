import { useEffect, useState } from "react";
import Events from "./Events";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SeatPicker from "./SeatPicker";

const router = createBrowserRouter([
	{
		path: '/',
		element: <Events/>
	},
	{
		path: '/events/:eventId',
		element: <SeatPicker/>
	}
])


export default function App() {

	return (
		<div className="container max-w-2xl mx-auto">
			<RouterProvider router={router}/>
		</div>
	);

};

