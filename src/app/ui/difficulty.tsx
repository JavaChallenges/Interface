import StarIcon from "@/app/ui/icons/star";
import React from "react";

export default function Difficulty({difficulty, size, className}: { difficulty: number, size: number, className?: string }) {
    return (
        <span
            className={"inline-flex items-center justify-center rounded-full border px-2 py-1 border-primary-100 text-primary-100 " + className}
        >
            <StarIcon className={"size-"+size} filled={difficulty >= 1}/>
            <StarIcon className={"size-"+size} filled={difficulty >= 2}/>
            <StarIcon className={"size-"+size} filled={difficulty >= 3}/>
            <StarIcon className={"size-"+size} filled={difficulty >= 4}/>
            <StarIcon className={"size-"+size} filled={difficulty >= 5}/>
        </span>
    );
}