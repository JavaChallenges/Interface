"use client"
import Toggle from "@/app/ui/toggle";
import {useTheme} from "next-themes";
import {ChangeEvent, Dispatch, MouseEventHandler, SetStateAction, useState} from "react";
import SoftAlert from "@/app/ui/alerts/softAlert";
import Divider from "@/app/ui/divider";
import {Modal} from "@/app/ui/modal";

const initialState: {
    show: boolean,
    title?: string,
    message?: string,
    status: number,
} = {
    show: false,
    status: 5
};
export default function Settings() {
    const {theme, setTheme} = useTheme();
    const [alert, setAlert] = useState(initialState);
    return (
        <div>
            <Modal isOpen={true} onClose={() => {
            }} hasCloseBtn={true}>
                <button type="button" className="rounded bg-green-50 px-4 py-2 text-sm font-medium text-green-600">
                    Yes, I'm sure
                </button>

                <button type="button" className="rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600">
                    No, go back
                </button>
            </Modal>
            <div className={"flex justify-items-center justify-between px-5 py-3"}><p>Darkmode: </p> <Toggle
                checked={theme === "dark"} toggleAction={() => theme == "dark" ? setTheme('light') : setTheme("dark")}/>
            </div>
            <Divider content=""/>
            <div className={"flex justify-items-center justify-between px-5 py-3"}>
            <span className={"w-1/2"}><Upload className={"p-4"} setAlert={setAlert}/></span>
                <span className={"w-1/2 flex justify-items-center"}><DownloadButton className={"m-auto"} onClick={downloadFile}/></span>
            </div>
            <Divider content={""} />
            <div className={"px-5 py-3 flex justify-end"}><ResettButton /></div>

            <span className={"absolute bottom-3 right-3"}>{alert.show ?
                <SoftAlert title={alert.title ? alert.title : ""} message={alert.message ? alert.message : ""}
                           type={alert.status}/> : null}</span>
        </div>
    );
}

function ResettButton({className}: {className?: string}) {
    function resetProgress() {
        for (const key in localStorage) {
            if (key.startsWith("code_") || key.startsWith("progress_")) {
                localStorage.removeItem(key);
            }
        }
    }
    return(
        <button onClick={resetProgress} className={`${className} 
            inline-block rounded px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring bg-red-500 hover:bg-red-600 active:bg-red-700 dark:bg-red-700 dark:active:bg-red-500
        `}>
            Fortschritt zurücksetzen
        </button>
    )
}

function DownloadButton({onClick, className}:{onClick: MouseEventHandler<HTMLButtonElement>, className: string}) {
    return (
        <button
            onClick={onClick}
            className={`
            ${className} inline-block rounded px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring 
            bg-primary-100 hover:bg-primary-200 active:bg-primary-300
            dark:bg-primary-300 dark:active:bg-primary-100
            `}
        >
            Fortschritt herunterladen
        </button>
    )
}

function Upload({setAlert, className}: {className: string, setAlert: Dispatch<SetStateAction<{show: boolean, title?: string, message?: string, status: number}>>}) {
    return (
        <div className={`${className} flex items-center justify-center w-full`}>
            <label htmlFor="dropzone-file"
                   className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Klicke hier um deinen Fortschritt hochzuladen</span>
                    </p>
                </div>
                <input id="dropzone-file" type="file" className="hidden"
                       onChange={(event) => handleFileChange(event, setAlert)}/>
            </label>
        </div>
    )
}

function downloadFile() {
    let content = "<javachallenge_progress>"
    for (const key in localStorage) {
        if (key.startsWith("code_") || key.startsWith("progress_")) {
            content += key + ":" + localStorage.getItem(key) + "||\n"
        }
    }
    const blob = new Blob([content], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "javachallenges.progress";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
