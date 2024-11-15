import fs from "fs";
import Link from "next/link";
import React from "react";
import BugIcon from "@/app/ui/icons/bug";
import OpenIcon from "@/app/ui/icons/open";
import LightbulbIcon from "@/app/ui/icons/lightbulb";

export function Info() {
    return (
        <>
            <Version/>
            <GithubLinks/>
        </>
    )
}


function IconLink({href, name, icon}: { href: string, name: string, icon: React.ReactNode }) {
    return (
        <Link target={"_blank"} rel="noopener noreferrer" className={"hover:underline"} href={href}>
            <span className={"flex items-center"}>{icon}{name}<OpenIcon className={'size-2.5 ml-1'}/></span>
        </Link>
    )
}

function GithubLinks() {
    return (
        <span className={"mt-2 flex justify-around"}>
            <IconLink
                href={"https://github.com/JavaChallenges/Interface/issues/new/choose"}
                name={"Verbesserung vorschlagen"}
                icon={<LightbulbIcon className={"size-4 mr-2"}/>}
            />
            <IconLink
                href={"https://github.com/JavaChallenges/Interface/issues/new/choose"}
                name={"Fehler melden"}
                icon={<BugIcon className={"size-4 mr-2"}/>}
            />
        </span>
    )
}

function ReportBug() {
    return (
        <Link target={"_blank"} rel="noopener noreferrer" className={"hover:underline"}
              href={"https://github.com/JavaChallenges/Interface/issues/new/choose"}>
            <span className={"flex items-center"}><BugIcon className={"size-4 mr-2"}/>Fehler melden<OpenIcon
                className={'size-2.5 ml-1'}/></span>
        </Link>
    )
}

async function Version({className}: { className?: string }) {
    let version;
    try {
        version = fs.readFileSync('./VERSION', 'utf8');
    } catch {
        version = "Lokale Development Version";
    }
    return (
        <div className={`${className} text-right`}>
            <p className={"text-xs"}>Version</p>
            <Link className={"text-sm hover:underline"} target="_blank" rel="noopener noreferrer"
                  href={`https://github.com/JavaChallenges/Interface/releases/tag/${version}`}>{version}</Link>
        </div>
    )
}