"use client"
import React, {useState} from "react";
import {Modal} from "@/app/ui/modal";

export function ResetButton({className}: { className?: string }) {
    const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

    function resetProgress() {
        for (const key in localStorage) {
            if (key.startsWith("code_") || key.startsWith("progress_")) {
                localStorage.removeItem(key);
            }
        }
        setConfirmModalOpen(false);
    }

    return (
        <>
            <Modal isOpen={isConfirmModalOpen} onClose={() => {
                setConfirmModalOpen(false)
            }}
                   title={"Fortschritt zurücksetzen?"}
                   description={"Möchtest du wirklich deinen gesamten Fortschritt zurücksetzen? Dieser Vorgang kann nicht rückgängig gemacht werden."}
                   hasCloseBtn={true}>
                <div className="flex gap-2">
                    <button type="button" onClick={resetProgress}
                            className="rounded bg-green-200 px-4 py-2 text-sm text-darkShades-500 font-medium">
                        Ja
                    </button>
                    <button type="button" onClick={() => setConfirmModalOpen(false)}
                            className="rounded bg-red-200 px-4 py-2 text-sm font-medium text-darkShades-500">
                        Abbrechen
                    </button>
                </div>
            </Modal>
            <button onClick={() => {
                setConfirmModalOpen(true)
            }} className={`${className} 
            inline-block rounded px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring bg-red-500 hover:bg-red-600 active:bg-red-700 dark:bg-red-700 dark:active:bg-red-500
        `}>
                Fortschritt zurücksetzen
            </button>
        </>
    )
}