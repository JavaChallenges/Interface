"use client"

import {ChallengeDetails} from "@/utils/typecollection";
import Difficulty from "@/app/home/ui/difficulty";
import CheckmarkIcon from "@/app/ui/icons/checkmark";
import {RenderedTag} from "@/app/ui/rendered-tag";

export function Title({path, challengeDetails}:{path: string, challengeDetails: ChallengeDetails}){
    const solved = localStorage.getItem(`progress_${path}`) === "solved";
    return (
        <>
            <h1 className="text-3xl font-bold">
                {challengeDetails.friendlyName}
                <span>
                <Difficulty className={"inline-block mx-4"} difficulty={challengeDetails.difficulty} size={4}/>
                    {solved ? <CheckmarkIcon className={"inline-block size-6 text-green-400"}/> : ""}
            </span>
            </h1>
            <div className={"mt-1"}>
                {challengeDetails.tags?.map((tag, index) => {
                    return (
                        <RenderedTag key={index} tag={tag}/>
                    )
                })}
            </div>
        </>
    )
}