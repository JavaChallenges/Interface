import {ReactNode, useEffect, useRef, useState} from "react";
import CrossIcon from "@/app/ui/icons/cross";

export function Modal({isOpen, onClose, hasCloseBtn, children}: {isOpen: boolean, onClose: () => void, hasCloseBtn: boolean, children?: ReactNode}) {
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
        <dialog ref={modalRef} onKeyDown={handleKeyDown} className="modal">
            <div className="rounded-lg bg-white p-8 shadow-2xl">
                {hasCloseBtn && (
                    <button className="border-none" onClick={handleCloseModal}>
                        <CrossIcon className={"size-5"}/>
                    </button>
                )}
                <h2 className="text-lg font-bold">Are you sure you want to do that?</h2>

                <p className="mt-2 text-sm text-gray-500">
                    Doing that could have cause some issues elsewhere, are you 100% sure it's OK?
                </p>

                <div className="mt-4 flex gap-2">
                    {children}
                </div>
            </div>
        </dialog>
    );
}