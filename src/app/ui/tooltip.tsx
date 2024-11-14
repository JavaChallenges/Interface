import {ReactNode} from "react";

export function Tooltip({children, tooltip}:{children: ReactNode, tooltip: string}){
    return (
        <>
            <div className="relative flex flex-col items-center group">
                {children}
                <div className="absolute top-0 flex-col items-center hidden mt-6 group-hover:flex">
                    <div className="w-3 h-3 -mb-2 rotate-45 bg-black"></div>
                    <span
                        className="relative z-10 p-2 text-xs leading-none text-white whitespace-nowrap bg-black shadow-lg">{tooltip}</span>
                </div>
            </div>
        </>
    )
}