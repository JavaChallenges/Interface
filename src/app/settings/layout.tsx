"use server"
import {ReactNode} from "react";

export default async function HomeLayout({children,}: { children: ReactNode }) {
    return (
        <section style={{height: "calc( 100% - 80px )"}} className={"h-full w-full overflow-y-auto px-32"}>

            {children}
        </section>
    );
}