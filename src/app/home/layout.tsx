"use server";
import Sidemenu from "@/app/ui/sidemenu";
import {loadChallenges} from "@/app/home/actions";
import {revalidatePath} from "next/cache";


export default async function HomeLayout({children,}: { children: React.ReactNode }) {
    const categories = await loadChallenges();

    return (
        <section style={{height: "calc( 100% - 60px )"}} className={" w-screen"}>
            <div className="h-full flex flex-row flex-wrap pl-2 py-4 ">
                <aside className="
                w-full h-full sm:w-1/3 md:w-1/6 px-2 rounded-lg
                bg-lightShades-200 dark:bg-darkShades-200
                ">
                    <div className="sticky top-0 p-4 w-full">
                        <Sidemenu categories={categories}/>
                    </div>
                </aside>
                <main role="main" className="w-full h-full sm:w-2/3 md:w-5/6 pt-1 px-2">
                    {children}
                </main>
            </div>
        </section>
    );
}