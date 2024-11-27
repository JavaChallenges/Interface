import fs from "fs";
import Link from "next/link";
import React from "react";
import BugIcon from "@/app/ui/icons/bug";
import OpenIcon from "@/app/ui/icons/open";
import LightbulbIcon from "@/app/ui/icons/lightbulb";
import ContributeIcon from "@/app/ui/icons/contribute";
import Contributors from "@/app/ui/contributors";
import {Contribrutor} from "@/utils/typecollection";

export function Info({contributorsInterface, contributorsChallenges}: {
    contributorsInterface: Contribrutor[],
    contributorsChallenges: Contribrutor[]
}) {
    return (
        <>
            <Contributors contributorsInterface={contributorsInterface}
                          contributorsChallenges={contributorsChallenges}/>
            <Versions/>
            <GithubLinks/>
        </>
    )
}


export function IconLink({href, name, icon}: { href: string, name: string, icon: React.ReactNode }) {
    return (
        <Link target={"_blank"} rel="noopener noreferrer" className={"hover:underline"} href={href}>
            <span className={"flex items-center text-darkShades-100 dark:text-lightShades-100"}>{icon}{name}<OpenIcon className={'size-2.5 ml-1'}/></span>
        </Link>
    )
}

function GithubLinks() {
    return (
        <span className={"mt-10 flex justify-around"}>
            <IconLink
                href={"https://github.com/JavaChallenges/Interface/issues/new?assignees=&labels=enhancement%2C+needs-review&projects=&template=verbesserungsvorschlag.md&title=%5BVerbesserungsvorschlag%5D+DEIN+TITEL"}
                name={"Verbesserung vorschlagen"}
                icon={<LightbulbIcon className={"size-4 mr-2"}/>}
            />
            <IconLink
                href={"https://github.com/JavaChallenges/Interface/issues/new?assignees=&labels=bug%2C+needs-review&projects=&template=bug_report.md&title=%5BBUG%5D+DEIN+TITEL"}
                name={"Fehler melden"}
                icon={<BugIcon className={"size-4 mr-2"}/>}
            />
            <IconLink
                href={"https://github.com/JavaChallenges/Interface/blob/f787cd6d07e57048af37ea37ba3e4a1ca00b6c73/.github/CONTRIBUTING.md"}
                name={"Selbst mithelfen"}
                icon={<ContributeIcon className={"size-4 mr-2"}/>}
            />
        </span>
    )
}


async function Versions({className}: { className?: string }) {
    let interfaceVersion;
    try {
        interfaceVersion = fs.readFileSync('./VERSION', 'utf8');
    } catch {
        interfaceVersion = "Lokale Development Version";
    }

    let challengeVersion;
    try {
        challengeVersion = fs.readFileSync('./challenges/VERSION', 'utf8');
    } catch {
        if (process.env.INDEV) {
            challengeVersion = "Development Version";
        } else {
            challengeVersion = "Lokale Development Version";
        }
    }
    return (
        <div className={`${className} text-right`}>
            <p className={"text-xs"}>Versionen</p>
            <span className={"text-sm"}>
                Interface:{" "}
                <Link
                    className={"hover:underline"}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://github.com/JavaChallenges/Interface/releases/tag/${interfaceVersion}`}>
                    {interfaceVersion}
                </Link>
            </span>
            <p className={"text-sm"}>Challenges: {challengeVersion}</p>
        </div>
    )
}