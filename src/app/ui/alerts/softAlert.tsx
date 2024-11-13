"use client";
import SuccessIcon from "@/app/ui/icons/success";
import AlertIcon from "@/app/ui/icons/alert";
import AttentionIcon from "@/app/ui/icons/attention";
import FailIcon from "@/app/ui/icons/fail";
import CheckmarkIcon from "@/app/ui/icons/checkmark";
import {TestResult} from "@/utils/typecollection";
import {Modal} from "@/app/ui/modal";
import {useState} from "react";
import {Tooltip} from "@/app/ui/tooltip";
import OpenIcon from "@/app/ui/icons/open";

export default function SoftAlert({title, message, type}: {
    title: string,
    message?: string | TestResult[],
    type: number
}) {
    let border ;
    let background;
    let text;
    let darkBorder ;
    let darkBackground;
    let darkText;
    let icon;
    if(type === 0) {
        border = "border-green-400";
        background = "bg-green-50";
        text = "text-green-600";
        darkBorder = "dark:border-green-500";
        darkBackground = "dark:bg-green-800";
        darkText = "dark:text-green-400";
        icon = <SuccessIcon className={"size-6"}/>
    } else if(type === 3) {
        border = "border-red-400";
        background = "bg-red-50";
        text = "text-red-600";
        darkBorder = "dark:border-red-500";
        darkBackground = "dark:bg-red-800";
        darkText = "dark:text-red-400";
        icon = <AlertIcon className={"size-6"}/>
    } else if(type === 2) {
        border = "border-amber-400";
        background = "bg-amber-50";
        text = "text-amber-600";
        darkBorder = "dark:border-amber-500";
        darkBackground = "dark:bg-amber-800";
        darkText = "dark:text-amber-400";
        icon = <AttentionIcon className={"size-6"}/>
    } else {
        border = "border-gray-400";
        background = "bg-gray-50";
        text = "text-gray-600";
        darkBorder = "dark:border-gray-500";
        darkBackground = "dark:bg-gray-800";
        darkText = "dark:text-gray-400";
        icon = ""
    }

    return (
        <div role="alert" className={`rounded-xl border p-4 w-full ${border} ${background} ${darkBorder} ${darkBackground}`}>
            <div className="flex items-start gap-4">
                <span className={`${text} ${darkText}`}>
                    {icon}
                </span>
                <div className="flex-1">
                    <strong className="block font-medium text-darkShades-100 dark:text-lightShades-100"> {title} </strong>
                    <div className="mt-1 text-sm text-darkShades-600 dark:text-lightShades-200">
                        {
                            typeof message === "string" ?
                                message :
                                message?.map((test: TestResult) => {
                                return (
                                    TestResultListItem(test)
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

function TestResultListItem(test: TestResult) {

    const style = "size-3 inline-block align-middle mr-1"
    return (
        <div key={test.name} className={"block pb-1"}>
            <div className={"flex items-center"}>
                {test.failmessage ? <FailIcon className={style + " text-red-600"}/> : <CheckmarkIcon className={style + " text-green-600"}/>}
                <strong className={"inline-flex"}>{test.name}</strong>
                {test.failmessage ? <p className={"inline-flex"}> - {test.failmessage}</p> : ""}
                <SystemOutModal test={test}/>
            </div>
            <div className={"ml-4 flex items-center"}>
                {test.failtype ? <p className={"block"}>{test.failtype}</p> : ""}
                <ErrorModal test={test}/>
            </div>
        </div>
    )
}

function ErrorModal({test}: {test: TestResult}) {
    const [isOutModalOpen, setOutModalOpen] = useState(false);
    return ( test.failError ?
            <>
                <Modal
                    className={"w-1/2"}
                    title={`${test.name} - Stacktrace`}
                    description={
                        <p className={"text-sm text-gray-500"}>
                            Fehlerprotokoll <br/> <span className={"text-xs font-bold"}>[Stacktrace]</span>
                        </p>
                    }
                    isOpen={isOutModalOpen}
                    onClose={() =>{
                        setOutModalOpen(false)
                    }} hasCloseBtn={true}>
                    <div className={"overflow-y-auto h-72"}>
                        {test.failError.split("\n").map((line, index) => {
                            return (
                                <p className={"block w-full break-words"} key={index}>{line}</p>
                            )
                        })}
                    </div>
                </Modal>
                <Tooltip tooltip={'Fehlerprotokoll Anzeigen'}>
                    <button
                        onClick={(event) => {
                            event.preventDefault()
                            setOutModalOpen(true);
                        }}>
                        <OpenIcon className={"size-3 mx-2 text-gray-600"}/>
                    </button>
                </Tooltip>
            </>
            : null
    )
}

function SystemOutModal({test}: {test: TestResult}) {
    const [isOutModalOpen, setOutModalOpen] = useState(false);
    return ( test.systemout ?
        <>
            <Modal
                className={"w-1/2"}
                title={`${test.name} - stdout`}
                description={
                    <p className={"text-sm text-gray-500"}>
                        Standart Output (stdout) <br/> <span className={"text-xs font-bold"}>[Augabe aus System.out.*]</span>
                    </p>
                }
                isOpen={isOutModalOpen}
                onClose={() =>{
                    setOutModalOpen(false)
                }} hasCloseBtn={true}>
                <div className={"overflow-y-auto h-72"}>
                    {test.systemout.split("\n").map((line, index) => {
                        return (
                            <p className={"block w-full mb-2 break-words border-b-[1px] border-b-lightShades-200"} key={index}>{line}</p>
                        )
                    })}
                </div>
            </Modal>
            <Tooltip tooltip={'Standard Ausgabe anzeigen'}>
                <button
                    onClick={(event) => {
                        event.preventDefault()
                        setOutModalOpen(true);
                    }}>
                    <OpenIcon className={"size-3 mx-2 text-gray-600"}/>
                </button>
            </Tooltip>
        </>
            : null
    )
}