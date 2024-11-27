"use client"
import Circleprogress from "@/app/ui/circleprogress";
import React, {useEffect, useState} from "react";
import {CategoryDetails} from "@/utils/typecollection";
import {
    getCategorySolvedPercent,
    getSolvedPercent,
    getTotalCategorySolved,
    getTotalSolved,
    isChallengeSolved
} from "@/app/backend/stats";
import Link from "next/link";
import {loadAllChallenges} from "@/app/home/challengeloader";

type Nofitication = {
    labelNumber: number,
    progress: number,
    title: string,
    additionalText: string,
    subtitle: string,
    color: string
}

export function ProgressNotifications({categoryDetails, allCategories}: {
    allCategories: CategoryDetails[],
    categoryDetails: CategoryDetails
}) {
    const categorySolvedPercent = getCategorySolvedPercent(categoryDetails);
    const [loading, setLoading] = useState(true)
    const [notifications, setNotifications] = useState<Nofitication[]>([])
    const [nextChallenge, setNextChallenge] = useState<string>("#")
    useEffect(() => {
        setNotifications([
            {
                labelNumber: getTotalCategorySolved(categoryDetails),
                progress: categorySolvedPercent,
                title: categoryDetails.friendlyName,
                additionalText: `+1`,
                subtitle: "Gelöst",
                color: categorySolvedPercent === 100 ? "#5cb85c" : "#ff9200"
            },
            {
                labelNumber: getTotalSolved(allCategories),
                progress: getSolvedPercent(allCategories),
                title: "Gesamtfortschritt",
                additionalText: `+1`,
                subtitle: "Gelöst",
                color: "#00a7e3"
            },
        ])
        for (const challenge of categoryDetails.challenges) {
            if (!isChallengeSolved(challenge)) {
                setNextChallenge(`/home/${categoryDetails.name}/${challenge.name}`)
                break;
            }
        }
        if(nextChallenge === "#"){
            for (const challenge of allCategories.map(cat => cat.challenges).flat()) {
                if (!isChallengeSolved(challenge)) {
                    setNextChallenge(`/home/${challenge.categoryRef}/${challenge.name}`)
                    break;
                }

            }
        }
        setLoading(false)
    }, [allCategories, categoryDetails, categorySolvedPercent, nextChallenge]);
    return (
        <>
            <span className={"col-span-2 row-span-1"}/>
            {notifications[0] && !loading ?
                <Circleprogress
                    labelNumber={notifications[0].labelNumber}
                    color={notifications[0].color}
                    title={notifications[0].title}
                    subtitle={notifications[0].subtitle}
                    className={"row-span-2 motion-preset-fade motion-duration-1500 motion-delay-1000"}
                    percentage={notifications[0].progress}
                    additionalText={notifications[0].additionalText}
                /> : null}
            {notifications[1] && !loading ?
                <Circleprogress
                    labelNumber={notifications[1].labelNumber}
                    color={notifications[1].color}
                    title={notifications[1].title}
                    subtitle={notifications[1].subtitle}
                    className={"row-span-2 motion-preset-fade motion-duration-1500 motion-delay-2000"}
                    percentage={notifications[1].progress}
                    additionalText={notifications[1].additionalText}
                /> : null}

            <span className={"col-span-2 row-span-3"}/>


            {notifications[2] && !loading ?
                <Circleprogress
                    labelNumber={notifications[2].labelNumber}
                    color={notifications[2].color}
                    title={notifications[2].title}
                    subtitle={notifications[2].subtitle}
                    className={"row-span-2 motion-preset-fade motion-duration-1500 motion-delay-[3000ms]"}
                    percentage={notifications[2].progress}
                    additionalText={notifications[2].additionalText}
                /> : <span className={"row-span-2"}/>}

            {!loading ?
                <Link
                    className={`
                        motion-preset-fade motion-duration-1500 motion-delay-[3500ms] row-span-2 mx-14
                        justify-center text-center inline-flex items-center gap-2 rounded border px-8 py-3
                         border-primary-100  text-primary-100 hover:bg-primary-100 hover:text-white focus:outline-none focus:ring active:bg-primary-200
                    `}
                    href={nextChallenge}
                >
                    <span className="text-sm font-medium"> Zur nächsten Challenge </span>

                    <svg
                        className="size-5 rtl:rotate-180"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                    </svg>
                </Link>
                : null}
        </>
    )
}