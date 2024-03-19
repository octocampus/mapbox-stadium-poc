
export default function Rightpanel({data}:any) {

    return (
        <div className=" absolute z-10 right-10 top-10 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            {!data && <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Click where you want to sit</h5>
            </a>}
            
        </div>
    )
}