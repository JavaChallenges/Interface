"use client"
import {ChangeEvent, Dispatch, SetStateAction, useState} from "react";
import SoftAlert from "@/app/ui/alerts/softAlert";


const initialState: {
    show: boolean,
    title?: string,
    message?: string,
    status: number,
} = {
    show: false,
    status: 5
};
export function Upload({className}: {className: string}) {
    const [alert, setAlert] = useState(initialState);
    return (
        <div className={`${className} flex items-center justify-center w-full`}>
            <span className={"absolute bottom-3 right-3"}>{alert.show ?
                <SoftAlert title={alert.title ? alert.title : ""} message={alert.message ? alert.message : ""}
                           type={alert.status}/> : null}
            </span>

            <label htmlFor="dropzone-file"
                   className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Fortschritt hochladen</span>
                    </p>
                </div>
                <input id="dropzone-file" type="file" className="hidden"
                       onChange={(event) => handleFileChange(event, setAlert)}/>
            </label>
        </div>
    )
}

function handleFileChange(event: ChangeEvent<HTMLInputElement>, setAlert: Dispatch<SetStateAction<{
    show: boolean,
    title?: string,
    message?: string,
    status: number
}>>) {
    if (event && event.target && event.target.files) {
        const file = event.target.files[0];
        if (!file.name.endsWith(".progress")) {
            displayAlert("Fehler beim Importieren", "Die Datei muss die Endung .progress haben", 3, setAlert);
            return
        }
        const reader = new FileReader();
        reader.onload = function (e) {
            let content = e.target?.result;
            if (content) {
                content = content.toString();
                if (content.startsWith("<javachallenge_progress>")) {
                    for (const key in localStorage) {
                        if (key.startsWith("code_") || key.startsWith("progress_")) {
                            localStorage.removeItem(key);
                        }
                    }
                    content = content.replace("<javachallenge_progress>", "");
                    const data = content.toString().split("||");
                    for (const line of data) {
                        const [key, value] = line.split(":");
                        if (key && value) {
                            localStorage.setItem(key, value);
                        }
                    }
                    displayAlert("Importiert", "Die Datei wurde erfolgreich importiert", 0, setAlert);
                } else {
                    displayAlert("Fehler beim Importieren", "Die Datei konnte leider nicht korrekt gelesen werden", 3, setAlert);
                }
            } else {
                displayAlert("Fehler beim Importieren", "Die Datei konnte leider nicht korrekt gelesen werden", 3, setAlert);
            }
        }
        reader.readAsText(file);
    }
}



function displayAlert(title: string, message: string, status: number, setAlert: Dispatch<SetStateAction<{
    show: boolean,
    title?: string,
    message?: string,
    status: number
}>>) {
    setAlert({show: true, title: title, message: message, status: status});
    setTimeout(() => {
        setAlert(initialState);
    }, 5000);
}