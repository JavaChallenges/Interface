"use client";
import SuccessIcon from "@/app/ui/icons/success";
import AlertIcon from "@/app/ui/icons/alert";
import AttentionIcon from "@/app/ui/icons/attention";
import FailIcon from "@/app/ui/icons/fail";
import CheckmarkIcon from "@/app/ui/icons/checkmark";

export default function SoftAlert({title, message, type}: {
    title: string,
    message?: string | {name: string, failtype?: string, failmessage?: string}[],
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

                    <p className="mt-1 text-sm text-darkShades-600 dark:text-lightShades-200">
                        {
                            typeof message === "string" ? message : message?.map((test: {name: string, failtype?: string, failmessage?: string}) => {
                                return testResult(test)
                            })
                        }
                    </p>
                </div>
            </div>
        </div>
    );
}

function testResult(test: {name: string, failtype?: string, failmessage?: string}) {
    const style = "size-3 inline-block align-middle mr-1"
    return (
        <div key={test.name} className={"block pb-1"}>
            <div className={"flex items-center"}>
                {test.failmessage ? <FailIcon className={style + " text-red-600"}/> : <CheckmarkIcon className={style + " text-green-600"}/>}
                <strong className={"inline-flex"}>{test.name}</strong>
                {test.failmessage ? <p className={"inline-flex"}> - {test.failmessage}</p> : ""}
            </div>
            {test.failtype ? <p className={"block"}>{test.failtype}</p> : ""}
        </div>
    )
}