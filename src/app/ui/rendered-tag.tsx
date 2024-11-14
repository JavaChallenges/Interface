"use client";
import {newShade} from "@/utils/helpers";
import Badge from "@/app/ui/badge";
import {Tag} from "@/utils/typecollection";
import Link from "next/link";

export function RenderedTag({tag, amount, className}: { tag: Tag, amount?:number, className?: string }){
    const darkenedColor = newShade(tag.color, -120);
    return (
        <Link className={className} href={`/home/tags/${tag.name}`}>
            <Badge style={{backgroundColor:`${tag.color}`, color:`${darkenedColor}`}} className={"text-xs m-1 hover:underline cursor-pointer"}>
                {tag.name}{amount && amount > 0 ? ` (${amount})` : ""}
            </Badge>
        </Link>
    )
}