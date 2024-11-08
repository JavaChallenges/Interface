"use client"

import {ChallengeDetails} from "@/app/typecollection";
import Difficulty from "@/app/ui/difficulty";
import CheckmarkIcon from "@/app/ui/icons/checkmark";

export function Title({path, challengeDetails}:{path: string, challengeDetails: ChallengeDetails}){
    const solved = localStorage.getItem(`progress_${path}`) === "solved";
    return (
        <h1 className="text-3xl font-bold">
            {challengeDetails.friendlyName}
            <span>
                <Difficulty className={"inline-block mx-4"} difficulty={challengeDetails.difficulty} size={4}/>
                {solved ? <CheckmarkIcon className={"inline-block size-6 text-green-400"}/> : ""}
            </span>
        </h1>
    )
}