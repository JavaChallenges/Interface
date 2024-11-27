"use client"
import React, {useEffect, useState} from "react";
import {CategoryDetails, ChallengeDetails, ProgressItem} from "@/utils/typecollection";
import Link from "next/link";
import {isChallengeSolved} from "@/app/backend/stats";

export function Progress({challenges, categorys, className}: {
    className?: string,
    challenges: ChallengeDetails[],
    categorys: CategoryDetails[]
}) {
    const [loading, setLoading] = useState(true) //state for loading
    const [progressItems, setProgressItems] = useState<ProgressItem[]>([]) //state for loading
    useEffect(() => {
        let progressItems: ProgressItem[] = []
        let solvedAll = true;
        for (const challengeKey in challenges) {
            const challenge = challenges[challengeKey as keyof typeof challenges] as ChallengeDetails;
            const challengeSolved = isChallengeSolved(challenge);
            progressItems.push({
                title: challenge.friendlyName,
                description: challenge.shortDescription,
                href: `/home/${challenge.categoryRef}/${challenge.name}`,
                completed: challengeSolved
            })
            if (!challengeSolved) {
                solvedAll = false;
            }
        }
        if (solvedAll) {
            progressItems = []
            for (const category of categorys) {
                let categorySolved = true;
                for (const challenge of category.challenges) {
                    const challengeSolved = global?.localStorage?.getItem(`progress_${category.name}/${challenge.name}`) === "solved";
                    if (!challengeSolved) {
                        categorySolved = false;
                        break;
                    }
                }
                progressItems.push({
                    title: category.friendlyName,
                    description: category.shortDescription,
                    completed: categorySolved,
                    href: `/home/${category.name}`
                })
            }
        }
        setProgressItems(progressItems)
        setLoading(false)
    }, [categorys, challenges]);
    return (
        <div className={`${className} h-full w-full`}>
            <h2 className={"text-center text-lg pb-4 sticky"}>Dein Fortschritt:</h2>
            <div style={{height: "calc( 100% - 45px )"}} className={`w-full px-10 overflow-y-auto`}>
                {loading ?
                    <Skeleton className={className}/>
                    :
                    <ol className="relative mb-3 left-1/2 -translate-x-1/2  w-fit flex flex-col  text-darkShades-100 dark:text-lightShades-100 border-s border-darkShades-600 dark:border-lightShades-200 ">
                        {progressItems.map((item, index) => (
                            <ProgressElement key={index} href={item.href} title={item.title}
                                             subtitle={item.description}
                                             completed={item.completed}/>
                        ))}
                        <li className="ms-6 w-fit flex flex-col justify-center">
                            <span
                                className="absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 bg-amber-100 dark:bg-amber-600 ring-4 ring-lightShades-100 dark:ring-darkShades-100">
                                <svg className={"w-4 h-4 text-yellow-500 dark:text-yellow-300"} fill="currentColor"
                                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                    <path
                                        d="M400 0L176 0c-26.5 0-48.1 21.8-47.1 48.2c.2 5.3 .4 10.6 .7 15.8L24 64C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7c44.3 43.1 98.3 64.8 138.1 75.8c23.4 6.5 39.4 26 39.4 45.6c0 20.9-17 37.9-37.9 37.9L192 448c-17.7 0-32 14.3-32 32s14.3 32 32 32l192 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-26.1 0C337 448 320 431 320 410.1c0-19.6 15.9-39.2 39.4-45.6c39.9-11 93.9-32.7 138.2-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24L446.4 64c.3-5.2 .5-10.4 .7-15.8C448.1 21.8 426.5 0 400 0zM48.9 112l84.4 0c9.1 90.1 29.2 150.3 51.9 190.6c-24.9-11-50.8-26.5-73.2-48.3c-32-31.1-58-76-63-142.3zM464.1 254.3c-22.4 21.8-48.3 37.3-73.2 48.3c22.7-40.3 42.8-100.5 51.9-190.6l84.4 0c-5.1 66.3-31.1 111.2-63 142.3z"/>
                                </svg>
                            </span>
                            <h3 className="font-medium leading-tight">Geschaft! &#127775;</h3>
                        </li>
                    </ol>
                }
            </div>
        </div>
    )
}

function Skeleton({className}: { className?: string }) {
    return (
        <div className={`${className} h-full w-full overflow-y-auto animate-pulse`}>
            <ol className="relative mt-1 left-1/2 -translate-x-1/2  w-fit flex flex-col  text-darkShades-100 dark:text-lightShades-100 border-s border-darkShades-600 dark:border-lightShades-200 ">
                <li className="mb-10 ms-6 w-fit flex flex-col justify-center">
                    <span
                        className="absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 bg-gray-200 dark:bg-gray-700 ring-4 ring-lightShades-100 dark:ring-darkShades-100">
                    </span>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-28 mb-2"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>
                </li>
                <li className="mb-10 ms-6 w-fit flex flex-col justify-center">
                    <span
                        className="absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 bg-gray-200 dark:bg-gray-700 ring-4 ring-lightShades-100 dark:ring-darkShades-100">
                    </span>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mb-2"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-56"></div>
                </li>
                <li className="ms-6 w-fit flex flex-col justify-center">
                    <span
                        className="absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 bg-gray-200 dark:bg-gray-700 ring-4 ring-lightShades-100 dark:ring-darkShades-100">
                    </span>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-52"></div>
                </li>
            </ol>
        </div>
    )
}

function ProgressElement({completed, title, subtitle, href}: {
    href: string,
    title: string,
    subtitle?: string,
    completed: boolean
}) {
    return (
        <li className="mb-10 ms-6 w-fit flex flex-col justify-center">
            {completed ? <Completed/> : <Todo/>}
            <Link className={"hover:underline"} href={href}>
                <h3 style={{textDecoration: `${completed ? "line-through" : "none"}`}}
                    className="font-medium leading-tight">{title}</h3>
                <p style={{textDecoration: `${completed ? "line-through" : "none"}`}}
                   className="text-sm max-w-72">{subtitle}</p>
            </Link>
        </li>
    )
}

function Todo() {
    return (
        <span
            className="absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 bg-lightShades-200 dark:bg-darkShades-200 ring-4 ring-lightShades-100 dark:ring-darkShades-100">
            <svg className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" aria-hidden="true"
                 xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                <path
                    d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"/>
            </svg>
        </span>
    )
}

function Completed() {
    return (
        <span
            className="absolute flex items-center justify-center w-8 h-8 rounded-full -start-4  bg-green-100 dark:bg-green-800 ring-4 ring-lightShades-100 dark:ring-darkShades-100">
            <svg className="w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true"
                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M1 5.917 5.724 10.5 15 1.5"/>
            </svg>
        </span>
    )
}

