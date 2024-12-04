"use server";
import {ReactNode} from "react";


export default async function HomeLayout({children,}: { children: ReactNode }) {
    return (
        <section style={{height: "calc( 100% - 80px )"}} className={" w-screen"}>
            <div className="h-full flex flex-row flex-wrap pl-2 pt-4 ">
                <main role="main" className="w-full h-full sm:w-2/3 md:w-5/6 pt-1 px-2">
                    {children}
                </main>
            </div>
        </section>
    );
}