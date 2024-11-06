import {ReactNode} from "react";

export default function Divider({className, content}: {className?: string, content:ReactNode}) {
    return (
        <span className={`${className} relative flex justify-center`}>
          <div
              className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"
          ></div>

          <span className="relative z-10 bg-lightShades-100 dark:bg-darkShades-100 px-6">{content}</span>
        </span>
)
}