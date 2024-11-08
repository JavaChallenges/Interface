import Divider from "@/app/ui/divider";
import {ResetButton} from "@/app/settings/options/danger/reset";
import {DownloadButton} from "@/app/settings/options/download";
import {Upload} from "@/app/settings/options/upload";
import Theme from "@/app/settings/options/theme";
import React from "react";

export default function Settings() {
    return (
        <>
            <Section title={'Aussehen'}><Theme/></Section>
            <Section title={"Fortschritt"}>
                <div className={"flex justify-items-center justify-between "}>
                    <span className={"w-1/2 flex flex-col"}>
                        <Upload className={"p-4"}/>
                        <p className={"text-xs font-bold text-center"}>Achtung! Bisheriger Fortschritt wird überschrieben</p>
                    </span>
                    <span className={"w-1/2 flex justify-items-center"}><DownloadButton className={"m-auto mr-5"}/></span>
                </div>
            </Section>
            <Section title={"Gefahrenzone"}>
                <div className={"flex p-5 border border-red-500 rounded-md justify-between"}>
                    <div className={"flex flex-col justify-center"}>
                        <p className={"font-bold text-sm align-middle"}>Kompletten Fortschritt zurücksetzen</p>
                        <p className={"text-xs"}>Dieser Vorgang ist unwiderruflich.</p>
                    </div>
                    <ResetButton/>
                </div>
            </Section>
        </>
    );
}

function Section({children, title}: { children: React.ReactNode, title: string }) {
    return (
        <section className={"pb-3 pt-7"}>
            <Divider content=""/>
            <h2 className={"inline-block pr-2 text-[32px] -translate-y-[28px] font-bold bg-lightShades-100 dark:bg-darkShades-100"}>{title}</h2>
                <div className={"px-48"}>{children}</div>
        </section>
    )
}