"use client"
import Link from "next/link";
import {usePathname} from "next/navigation";
import {ChallengeDetails, SidebarInfo} from "@/utils/typecollection";
import CheckmarkIcon from "@/app/ui/icons/checkmark";
import {isChallengeSolved} from "@/app/backend/stats";
import React, {useEffect, useState} from "react";
import {getRandomNumber} from "@/utils/helpers";

export default function Sidemenu({sidebarInfo}: {sidebarInfo: SidebarInfo}) {
    const pathname = usePathname()
    return (
        <ul className="space-y-1">
            {sidebarInfo.map((category, index) => {
                if (category.challenges) {
                    return (
                        <Challenges key={index} friendlyName={category.friendlyName} pathname={pathname} categoryName={category.name} active={pathname.includes(category.name)} challenges={category.challenges}/>
                        )
                } else {
                   return (
                     <SimpleCategory key={index} name={category.name} friendlyName={category.friendlyName} active={(pathname.includes(category.name) && category.name !== "/") || pathname === "/home"}/>
                   )
                }
            })}
        </ul>
    );
}

function SimpleCategory({name, friendlyName, active}:{name: string, friendlyName: string, active: boolean}) {
    return (
        <li>
            <Link href={`/home/${name}`}
                  className={
                                `block rounded-lg px-4 py-2 text-sm font-medium
                                ${active ? "bg-lightShades-100 dark:bg-darkShades-500" : ""}
                                text-darkShades-100 dark:text-lightShades-100
                                hover:bg-lightShades-100 dark:hover:bg-darkShades-500`
                            }>
                {friendlyName}
            </Link>
        </li>
    );
}


function Challenges({friendlyName, categoryName, pathname, active, challenges} : {
    friendlyName: string,
    pathname: string,
    categoryName: string,
    active: boolean,
    challenges: ChallengeDetails[]
}) {
    const [solved, setSolved] = useState(false);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setSolved(challenges.every(isChallengeSolved));
        setLoaded(true);
    }, [challenges]);
    if(loaded){
        return (
            <li>
                <details open={active} className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary
                        className={`flex cursor-pointer items-center justify-between rounded-lg px-4 py-2
                                ${active ? "bg-lightShades-100 dark:bg-darkShades-500" : ""}
                                text-darkShades-100 dark:text-lightShades-100
                                hover:bg-lightShades-100 dark:hover:bg-darkShades-500
                            `}
                    >
                    <span className={`text-sm font-medium flex items-center ${solved ? "text-darkShades-600 dark:text-lightShades-300" : ""}`}>
                        {friendlyName}
                        {solved ?
                            <CheckmarkIcon className={"md:size-8 lg:size-4 ml-3 text-green-400"}/>
                            : ""}
                    </span>

                        <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="size-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                      >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    </summary>

                    <ul className="mt-2 space-y-1 px-4">
                        {challenges.map((challenge) => {
                            return (
                                <ChallengeEntry
                                    key={challenge.name}
                                    challenge={challenge}
                                    active={active && pathname.includes(`/${challenge.name}`)}
                                    categoryName={categoryName}
                                />
                            )
                        })}
                    </ul>
                </details>
            </li>
        );
    } else {
        return null
    }
}

function ChallengeEntry({challenge, active, categoryName}: {challenge: ChallengeDetails, categoryName: string, active: boolean}) {
    const [loaded, setLoaded] = useState(false);
    const [solved, setSolved] = useState(false);
    useEffect(() => {
        setSolved(isChallengeSolved(challenge))
        setLoaded(true);
    }, [challenge]);
    if(loaded){
        return (
            <li>
                <Link
                    href={`/home/${categoryName}/${challenge.name}`}
                    className={`
                    block rounded-lg px-4 py-2 text-sm font-medium
                    ${active ? "bg-lightShades-100 dark:bg-darkShades-500" : ""}
                    text-darkShades-100 dark:text-lightShades-100
                    hover:bg-lightShades-100 dark:hover:bg-darkShades-500
                `}
                >
                <span className={
                    `flex items-center
                    ${solved ? "text-darkShades-600 dark:text-lightShades-300" : ""}`
                }>
                    {challenge.friendlyName}{solved ? <CheckmarkIcon className={"md:size-8 lg:size-4 ml-3 text-green-400"}/> : ""}
                </span>
                </Link>
            </li>
        );
    } else {
        return (
            <li>
                <Link
                    href={`/home/${categoryName}/${challenge.name}`}
                    className={`
                    block rounded-lg px-4 py-2 text-sm font-medium
                    ${active ? "bg-lightShades-100 dark:bg-darkShades-500" : ""}
                    text-darkShades-100 dark:text-lightShades-100
                    hover:bg-lightShades-100 dark:hover:bg-darkShades-500
                `}
                >
                <span className={
                    `flex items-center
                    ${solved ? "text-darkShades-600 dark:text-lightShades-300" : ""}`
                }>
                    <div style={{width: `${getRandomNumber(5, 15)}rem` }} className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </span>
                </Link>
            </li>
        )
            ;
    }
}