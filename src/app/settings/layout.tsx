import {ReactNode} from "react";

export default function HomeLayout({children,}: { children: ReactNode }) {
    return (
        <section className={"h-full w-full overflow-y-auto px-32"}>

            {children}
        </section>
    );
}