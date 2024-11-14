import React, {ReactNode} from "react";

export default function Badge({className, children, style}: {
    style?: React.CSSProperties,
    children: ReactNode,
    className?: string,
    key?: string
}) {
    return (
        <span
            style={style}
            className={"inline-flex items-center justify-center rounded-full border px-2 py-1 " + className}
        >
            {children}
        </span>
    );
}