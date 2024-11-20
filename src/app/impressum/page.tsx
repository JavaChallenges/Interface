import React from "react";
import RenderedMarkdown from "@/app/home/ui/markdown";
import {notFound} from "next/navigation";
import {loadMarkdown} from "@/app/backend/IO";

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