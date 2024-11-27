"use client"
import Image from "next/image";
import {CategoryDetails, ChallengeDetails} from "@/utils/typecollection";
import {getCategorySolvedPercent, isChallengeSolved} from "@/app/backend/stats";
import {useRouter} from "next/navigation";

export function SuccessCard({className, categoryDetails, challengeDetails}:{categoryDetails:CategoryDetails, challengeDetails:ChallengeDetails, className?:string}) {
    const router = useRouter();
    const successMessage = (<span>
        Du hast die Challenge {challengeDetails.friendlyName} erfolgreich gelöst. Sehr gut!<br/>
        Damit hast du {getCategorySolvedPercent(categoryDetails)}% der Challenges in der Kategorie {categoryDetails.friendlyName} gelöst.
    </span>)
    if(!isChallengeSolved(challengeDetails)){
        router.push(`/home`)
    }
    return (
        <div className={`${className} bg-red h-full w-full overflow-hidden relative rounded-md shadow-2xl`}>
            <div style={{width: "calc( 100% + 300px )"}}
                 className="absolute -top-32 left-1/2 h-2/3 -translate-x-1/2 rounded-[100%] bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500">
                <Circle className={"size-3 absolute bottom-[5rem] right-[15rem] text-teal-400"}/>
                <Firework className={"size-14 absolute bottom-[10rem] right-[10rem] text-pink-500"}/>
                <Triangle className={"size-4 rotate-[20deg] absolute bottom-[2.5rem] right-[20rem] text-pink-500"}/>
                <Rectangle className={"size-5 rotate-[50deg] absolute bottom-[7rem] right-[22rem] text-indigo-500"}/>
                <Triangle className={"size-3 rotate-[50deg] absolute bottom-[9rem] right-[17rem] text-yellow-500"}/>
                <Circle className={"size-4 absolute bottom-[11rem] right-[28rem] text-teal-400"}/>
                <Circle className={"size-3 absolute bottom-[10.5rem] left-[28rem] text-purple-400"}/>
                <Triangle className={"size-3 rotate-[80deg] absolute bottom-[11rem] left-[21rem] text-purple-400"}/>
                <Rectangle className={"size-3.5 rotate-[60deg] absolute bottom-[7rem] left-[22.5rem] text-indigo-500"}/>
                <Rectangle className={"size-5 rotate-[85deg] absolute bottom-[3rem] left-[21rem] text-yellow-500"}/>
                <Triangle className={"size-2 rotate-[30deg] absolute bottom-[5rem] left-[16rem] text-teal-400"}/>
                <Firework className={"size-20 absolute bottom-[8rem] left-[12rem] text-yellow-500"}/>
            </div>
            <Image width={100} height={100}  src="/Ribbon.svg" className={"absolute xl:bottom-1/3 xl:w-1/5 lg:bottom-[33%] lg:w-1/4 bottom-[40%] w-[30%] left-1/2 -translate-x-1/2 "} alt="My Happy SVG"/>
            <div className="absolute w-full left-1/2 -translate-x-1/2 bottom-[12%] text-center">
                <h1 className="text-3xl pb-5 font-bold ">Herzlichen Glückwunsch</h1>
                <p className="text-lg text-gray-400 mx-8">{successMessage}</p>
            </div>
        </div>
    )
}

function Circle({className}:{className: string}){
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 512 512"
            fill="currentColor"
            strokeWidth="20"
            stroke="currentColor"
            className={className}>
            <path
                d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/>
        </svg>
    )
}

function Triangle({className}:{className: string}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 384 512"
             fill="currentColor"
             strokeWidth="20"
             stroke="currentColor"
             className={className}
        >
            <path
                d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/>
        </svg>
    )
}

function Rectangle({className}:{className: string}){
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 448 512"
             fill="currentColor"
             strokeWidth="20"
             stroke="currentColor"
             className={className}
        >
            <path
                d="M0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96z"/>
        </svg>
    )
}

function Firework({className}:{className: string}){
    return (
        <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 252.47 249.95"
             fill="currentColor"
             strokeWidth="20"
             stroke="currentColor"
             className={className}
        >
            <path
                d="M3.28,124.71l88.19.53M14.51,78.01l71.17,29.66M84.65,142.75l-69.07,28.85M39.3,36.26l62.51,63.04M101.81,150.65l-61.24,61.76M111.09,84.72L81.42,14.05M80.88,238.61l30.19-72.88M127.56,3.28l-.11,83.65M127.56,163.02l-.11,83.65M174.56,9.51l-30.62,75.22M174.11,238.61l-30.19-72.88M213.92,38.05l-60.73,61.25M153.19,150.65l60.73,61.25M165.54,124.96h83.65M168.26,108.57l71.16-30.19M239.86,171.72l-70.55-29.44"
                fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6.55"/>
        </svg>
    )
}