import { useRef, useState } from "react"
import { supabaseClient } from "./createClient";


export default function EventFormModal() {
    const modalRef = useRef(null);
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');

    const handleClick = () => {
        modalRef.current?.classList.toggle("hidden");
    }

    const handleClose = () => {
        modalRef.current?.classList.add("hidden");
    }

    const handleEventNameChange = (e) => {
        setEventName(e.target.value);
    }

    const handleEventDateChange = (e) => {
        setEventDate(e.target.value);
    }

    const createEvent = async () => {

        try {
            const { data, error } = await supabaseClient.from('events').insert([
                { name: eventName, date: eventDate, venue:1 }
            ]);
            if (error) {
                console.error('Error inserting event:', error.message);
                return;
            }
            console.log('Event inserted successfully:', data);
            return data;
        } catch (error) {
            console.error('Error inserting event:', error.message);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const event = createEvent();
        
        
        setEventName('');
        setEventDate('');
        handleClose();
    }

    return (
        <div>
            <button onClick={handleClick} data-modal-toggle="default-modal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                New Event
            </button>
            <div ref={modalRef} className="hidden overflow-y-auto overflow-x-hidden absolute  z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="absolute p-4 w-full max-h-full">

                    <div className=" max-w-2xl bg-white rounded-lg mx-auto mt-10 shadow dark:bg-gray-700">
                        <div className="p-10">
                            <div className="mb-6">
                                <label htmlFor="Event Name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event Name</label>
                                <input onChange={handleEventNameChange} type="Event Name" id="Event Name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="Event Date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event Date</label>
                                <input onChange={handleEventDateChange} type="Date" id="Event Date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                        </div>

                        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button onClick={handleSubmit} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                            <button onClick={handleClose} type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}
