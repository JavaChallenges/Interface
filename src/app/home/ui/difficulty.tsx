import StarIcon from "@/app/ui/icons/star";
import React from "react";
import Badge from "@/app/ui/badge";

export default function Difficulty({difficulty, size, className}: { difficulty: number, size: number, className?: string }) {
    return (
        <Badge className={`border-primary-100 text-primary-100 ${className}`}>
            <StarIcon className={"size-"+size} filled={difficulty >= 1}/>
            <StarIcon className={"size-"+size} filled={difficulty >= 2}/>
            <StarIcon className={"size-"+size} filled={difficulty >= 3}/>
            <StarIcon className={"size-"+size} filled={difficulty >= 4}/>
            <StarIcon className={"size-"+size} filled={difficulty >= 5}/>
        </Badge>
    );
}