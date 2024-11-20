import React from "react";
import {loadMarkdown} from "@/app/home/challengeloader";
import RenderedMarkdown from "@/app/home/ui/markdown";
import {notFound} from "next/navigation";

export default async function Settings() {
    const markdown = await loadMarkdown("impressum.md");
    if(!markdown) {
        return notFound();
    }
    return (
        <>
            <RenderedMarkdown markdown={markdown}/>
        </>
    );
}