"use client";

import {useActionState, useState} from "react";
import {useFormStatus} from "react-dom";
import {validateCode} from "@/app/home/[categorie]/[challenge]/actions";
import Loader from "@/app/ui/loader";
import ErrorAlert from "@/app/ui/alerts/errorAlert";
import SoftAlert from "@/app/ui/alerts/softAlert";
import RenderedEditor from "@/app/ui/editor/RenderedEditor";

const initialState: {
    errormessage?: string,
    statuscode: number,
    errorLines: { [key: string]: number[] },
    testresults?: { name: string, failtype?: string, failmessage?: string }[],
} = {
    errormessage: "",
    statuscode: 0,
    errorLines: {},
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button
            style={{lineHeight: 0}}
            className={
                "block rounded-lg h-10 text-center px-5 py-3 text-sm font-medium shadow-md " +
                "bg-primary-100 text-lightShades-100 shadow-primary-300 " +
                "hover:bg-primary-200 "
            }
            type="submit" aria-disabled={pending}
        >
            {pending ? <Loader/> : "Testen"}
        </button>
    );
}

function Report({state}: { state: typeof initialState }) {
    const { pending } = useFormStatus();
    if(state.statuscode === 0) {
        return (<SoftAlert title={"Alle Tests bestanden"} message={pending ? "Wird getestet..." : state.testresults}  type={state.statuscode}/>)
    } else if(state.statuscode === 2) {
        return (<SoftAlert title={"Einige Tests fehlgeschlagen"} message={pending ? "Wird getestet..." : state.testresults}  type={state.statuscode}/>)
    } else if(state.statuscode === 3) {
        return (<SoftAlert title={"Alle Tests fehlgeschlagen"} message={pending ? "Wird getestet..." : state.testresults}  type={state.statuscode}/>)
    } else {
        return (<ErrorAlert title={"Error"} message={pending ? "Wird getestet..." : state.errormessage}/>)
    }
}

export function CodeForm({templates, challengePath}: {templates:{title:string, content: string, classname: string}[], challengePath: string}) {
    const [state, formAction] = useActionState(validateCode, initialState);
    const initalCode:{ [key: string]: string }= {};

    templates.map((template: { title: string; content: string; classname:string;}) => {
        initalCode[template.classname] = template.content;
    })

    templates.map((template: { title: string; content: string; classname: string; }) => {
        if(localStorage.getItem(`${challengePath}/${template.classname}`)){
            initalCode[template.classname] = localStorage.getItem(`code_${challengePath}/${template.classname}`) as string;
        }
    })

    const solved = localStorage.getItem(`progress_${challengePath}`) === "solved";

    const [code, setCode] = useState(initalCode);


    const { pending } = useFormStatus();
    if(!pending && state.testresults) {
        templates.map((template: { title: string; content: string; classname: string; }) => {
            localStorage.setItem(`code_${challengePath}/${template.classname}`, code[template.classname]);
        })
        if(state.testresults.length > 0 && state.statuscode === 0){
            localStorage.setItem(`progress_${challengePath}`, "solved");
        }
    }

    return (
        <form action={formAction}>
            <input className={"hidden"} readOnly value={`${challengePath}`} type="text" id="challengepath"
                   name="challengepath"/>
            {
                templates.map((template: { title: string; content: string; classname: string; }, index) =>
                    <div key={index}>
                        <label htmlFor={`code-${template.classname}`}>{template.title}</label>
                        <input className={"hidden"} readOnly value={code[template.classname].replaceAll("\n", "/l/")}
                               type="text"
                               id={`code-${template.classname}`} name={`code-${template.classname}`}
                               required/>
                        <RenderedEditor
                            enabled={!solved}
                            className={`
                                ${solved ? "border-green-300" : "border-primary-50"}
                            `}
                            highlightedLines={state?.errorLines} template={template} code={code[template.classname]}
                            setCode={setCode}
                        />
                    </div>
                )
            }

            <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-[1fr_120px] lg:gap-8">
                {state.errormessage || state.testresults ? <Report state={state}/> : <span/>}
                {solved? null :
                    <SubmitButton/>
                }
            </div>
        </form>
    );
}