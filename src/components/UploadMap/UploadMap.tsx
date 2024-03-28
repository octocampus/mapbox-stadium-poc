import {StyleSpecification} from "maplibre-gl";
import {ChangeEvent, useEffect, useState} from "react";
import {convertFromString} from "s2g_props";

export function UploadMap({setStyleSpec}: { setStyleSpec: (spec: StyleSpecification) => void }) {
    const [svg, setSVG] = useState<string>()
    const [error, setError] = useState(false);
    const [config, setConfig] = useState<string>()
    useEffect(() => {
        setError(false);
    }, [svg, config])

    function handleSVGUpload(event: ChangeEvent<HTMLInputElement>) {
        const fileList = event.target.files || [];
        if (fileList.length > 0) {
            const file = fileList[0];
            const reader = new FileReader();
            reader.onload = () => {
                const fileContent = reader.result as string;
                console.log(fileContent)
                setSVG(fileContent)
            }
            reader.readAsText(file)
        }
    }

    function displayMap() {
        if (!svg || !config)
            return;


        let styleObject = null;
        try {
            const parsedConfig = JSON.parse(config)
            styleObject = convertFromString(svg, parsedConfig) as StyleSpecification;
        } catch (ex) {
            console.log("Something went wrong")
            setError(true)
            return;
        }


        console.log(styleObject)
        setStyleSpec(styleObject)
    }

    function handleConfigUpload(event: ChangeEvent<HTMLInputElement>) {
        const fileList = event.target.files || [];
        if (fileList.length > 0) {
            const file = fileList[0];
            const reader = new FileReader();
            reader.onload = () => {
                const fileContent = reader.result as string;
                console.log(fileContent)
                setConfig(fileContent)
            }
            reader.readAsText(file)
        }
    }

    return (
        <div>
            <form className=" w-full mx-auto rounded-lg shadow-2xl bg-gray-400 p-5 ">
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
                        className="mt-3 focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Dispaly
                    Map
                </button>
                {error && <span className="text-red-600 font-bold text-md block"> Something went wrong!</span>}
            </form>

        </div>
    )
}