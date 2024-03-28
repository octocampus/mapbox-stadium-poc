import Map from 'react-map-gl/maplibre'
import {useEffect, useState} from "react";
import {convertFromString} from "s2g_props"
import {createBrowserRouter} from "react-router-dom";

export default function App() {
	const [svg,setSVG] = useState("")
	const [config, setConfig] = useState(null)
	const [styleSpec,setStyleSpec] = useState(null)
	const [error,setError] = useState(false);
	function handleSVGUpload(event) {
		const fileList = event.target.files;
		if(fileList.length > 0){
			const file = fileList[0];
			const reader = new FileReader();
			reader.onload = () => {
				const fileContent = reader.result;
				console.log(fileContent)
				setSVG(fileContent)
			}
			reader.readAsText(file)
		}
	}

	function handleConfigUpload(event) {
		const fileList = event.target.files;
		if(fileList.length > 0){
			const file = fileList[0];
			const reader = new FileReader();
			reader.onload = () => {
				const fileContent = reader.result;
				console.log(fileContent)
				setConfig(fileContent)
			}
			reader.readAsText(file)
		}
	}

	useEffect(()=>{
		setError(false);
	},[svg,config])

	function displayMap(){
		if(svg == "" || config == null)
			return;


		let styleObject=null;
		try {
			const parsedConfig = JSON.parse(config)
			styleObject = convertFromString(svg,parsedConfig)
		}
		catch (ex){
			console.log("Something went wrong")
			setError(true)
			return;
		}


		console.log(styleObject)
		setStyleSpec(styleObject)
	}


	return (
		<div className="container grid grid-cols-5">

			<div className="col-span-4">
				<Map
					initialViewState={{
						longitude: -121.9682,
						latitude: 37.3713,
						zoom: 15
					}}
					style={{width: "100%", height: "100vh"}}
					mapStyle={styleSpec || "out.json"}
				/>
			</div>
			<div className="col-span-1 min-h-72 p-2">
				<form className="max-w-lg mx-auto rounded-lg shadow-2xl bg-gray-400 p-5 ">
					<label className="block mb-2 text-sm font-medium text-gray-900 " htmlFor="svg_file">Upload
						svg</label>
					<input
						className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
						aria-describedby="user_avatar_help" id="svg_file" type="file"
						onChange={handleSVGUpload}
					/>
					<div className="mt-1 text-sm text-gray-500 " id="user_avatar_help">the svg should follow some
						rules
					</div>
					<label className="block mb-2 text-sm font-medium text-gray-900 " htmlFor="svg_file">Upload
						config</label>
					<input
						className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
						aria-describedby="user_avatar_help" id="config_file" type="file"
						onChange={handleConfigUpload}
					/>
					<button type="button"
							disabled={svg == "" || config == null}
							onClick={displayMap}
							className="mt-3 focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Dispaly Map
					</button>
					{error && <span className="text-red-600 font-bold text-md block"> Something went wrong!</span>}
				</form>
			</div>
		</div>

	);

}

