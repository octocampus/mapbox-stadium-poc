import {useState} from "react";
import {InteractiveSeatMap} from "./components/InteractiveSeatMap";
import {DefaultStyleLayer} from "./components/DefaultStyleLayer";
import {StyleSpecification} from "maplibre-gl";
import {UploadMap} from "./components/UploadMap";

export default function App() {
	const [styleSpec, setStyleSpec] = useState<string|StyleSpecification>()

	return (
		<div className="container grid grid-cols-7">

			<div className="col-span-5">
				<InteractiveSeatMap styleSpec={styleSpec || "defaultMap.json"} >
					<DefaultStyleLayer />
				</InteractiveSeatMap>
			</div>
			<div className="col-span-2 min-h-72 p-2 ">
				<UploadMap setStyleSpec={setStyleSpec} />
			</div>
		</div>

	);

}

