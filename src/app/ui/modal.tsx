import React, {ReactNode, useEffect, useRef, useState} from "react";
import CrossIcon from "@/app/ui/icons/cross";

export function Modal({isOpen, onClose, hasCloseBtn, children, title, description, className}: {className?:string, title: string, description: string|ReactNode, isOpen: boolean, onClose: () => void, hasCloseBtn: boolean, children?: ReactNode}) {
    const [isModalOpen, setModalOpen] = useState(isOpen);
    const modalRef = useRef<HTMLDialogElement | null>(null);

    const handleCloseModal = () => {
        if (onClose) {
            onClose();
        }
        setModalOpen(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
        if (event.key === "Escape") {
            handleCloseModal();
        }
    };

    useEffect(() => {
        setModalOpen(isOpen);
    }, [isOpen]);

    useEffect(() => {
        const modalElement = modalRef.current;

        if (modalElement) {
            if (isModalOpen) {
                modalElement.showModal();
            } else {
                modalElement.close();
            }
        }
    }, [isModalOpen]);

    return (

        <dialog ref={modalRef} onKeyDown={handleKeyDown} className={`${className} modal`}>
            <div className="border-2 border-primary-100 h-full rounded-lg bg-lightShades-100 dark:bg-darkShades-300 p-8 shadow-2xl">
                {hasCloseBtn && (
                    <button className="border-none w-full flex justify-end" onClick={(event) => {
                        event.preventDefault();
                        handleCloseModal();
                    }}>
                        <CrossIcon className={"size-5"}/>
                    </button>
                )}
                <h2 className="text-lg font-bold">{title}</h2>

                <p className="mt-2 text-sm text-gray-500">
                    {description}
                </p>

                <div className="mt-4 w-full">
                    {children}
                </div>
            </div>
        </dialog>
    );
}