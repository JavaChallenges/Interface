"use client"
export function DownloadButton({className}:{className: string}) {
    return (
        <button
            onClick={downloadFile}
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



function downloadFile() {
    let content = "<javachallenge_progress>"
    for (const key in localStorage) {
        if (key.startsWith("code_") || key.startsWith("progress_")) {
            content += key + ":" + localStorage.getItem(key) + "||\n"
        }
    }
    content += "streak:" + localStorage.getItem("streak") + "||\n";
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