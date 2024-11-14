'use client';
import Difficulty from "@/app/home/ui/difficulty";
import BadgeIcon from "@/app/ui/icons/badge";
import {ChallengeDetails} from "@/utils/typecollection";
import {RenderedTag} from "@/app/ui/rendered-tag";
import React from "react";

export function Challenge({challenge, category, className}: {
    className?: string,
    challenge: ChallengeDetails,
    category: string,
}) {
    const solved = localStorage.getItem(`progress_${category}/${challenge.name}`) === "solved";
    return (
        <div className={className}>
            <article
                className="rounded-xl w-full border-2 flex flex-col border-lightShades-300 dark:accent-darkShades-300 bg-lightShades-100 dark:bg-darkShades-100 text-darkShades-100 dark:text-lightShades-100">
                <div className="gap-4 p-4">
                    <div>
                        <h3 className="font-medium text-inherit sm:text-lg">
                            <a href={`/home/${category}/${challenge.name}`}
                               className="hover:underline"> {challenge.friendlyName} </a>
                        </h3>
                        <div className="flow-root">
                            <dl className="text-inherit divide-y divide-darkShades-600 dark:divide-lightShades-300 text-sm grow">
                                <div className="grid grid-cols-3 gap-1 py-2">
                                    <dt className="font-medium text-inherit">Schwierigkeit</dt>
                                    <dd className="dark:text-lightShades-200 text-darkShades-200 text-right col-span-2">
                                        <Difficulty className={"ml-auto"}
                                                    difficulty={challenge.difficulty} size={3}/>
                                    </dd>
                                </div>

                                <Section title={"Beschreibung"}>
                                    {challenge.shortDescription}
                                </Section>
                                {challenge.tags && challenge.tags.length > 0 ?
                                    <div className="grid grid-cols-4 gap-1 py-2">
                                        <dt className="font-medium text-inherit">Tags</dt>
                                        <dd className="dark:text-lightShades-200 text-darkShades-200 text-right col-span-3">
                                            {
                                                challenge.tags.map((tag, index) => {
                                                    return (
                                                        <RenderedTag key={index} tag={tag}/>
                                                    )
                                                })
                                            }
                                        </dd>
                                    </div>
                                    : null
                                }
                            </dl>
                        </div>
                    </div>
                </div>
                {solved ? <Badge/> : <span/>}
            </article>
        </div>
    )
}

function Section({children, title}: { children: React.ReactNode, title: string }) {
    return (
        <div className="grid grid-cols-1 gap-1 py-2">
            <dt className="font-medium text-inherit">{title}</dt>
            <dd className="dark:text-lightShades-200 text-darkShades-200 text-left col-span-2">
                {children}
            </dd>
        </div>
    )
}

function Badge() {
    return (
        <div className="flex justify-end mt-auto">
            <strong
                className="-mb-[2px] -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl bg-green-600 px-3 py-1.5 text-white"
            >
                <BadgeIcon className="size-4"/>

                <span className="text-[10px] font-medium sm:text-xs">Gelöst</span>
            </strong>
        </div>
    )
}