import Breadcrumps from "@/app/ui/breadcrumps";
import RenderedMarkdown from "@/app/home/ui/markdown";
import {CodeForm} from "@/app/home/[categorie]/[challenge]/codeform";
import {notFound} from "next/navigation";
import {Title} from "@/app/home/[categorie]/[challenge]/title";
import {loadCategoryDetails, loadChallengeDetails} from "@/app/home/challengeloader";
import {loadMarkdown} from "@/app/backend/IO";
import React from "react";

export default async function Page({params,}: { params: Promise<{ categorie: string, challenge: string }> }) {
    const categorieName = (await params).categorie;
    const categorieDetails = await loadCategoryDetails(categorieName);
    const challenge = (await params).challenge
    const challengeDetails = await loadChallengeDetails(categorieName, challenge);
    const markdown = await loadMarkdown(`./challenges/${categorieName}/${challenge}/description.md`);

    if(!challengeDetails|| !markdown || !categorieDetails){
        return notFound();
    }

    const path = [
        {ref: categorieDetails.name, friendlyName: categorieDetails.friendlyName},
        {ref: categorieDetails.name+"/"+challengeDetails.name, friendlyName: challengeDetails.friendlyName},
    ]

    return (
        <>
            <Breadcrumps path={path}/>
            <div className={"h-full overflow-y-auto pt-6 pr-4 pb-6"}>
                <Title path={`${categorieDetails.name}/${challengeDetails.name}`} challengeDetails={challengeDetails}/>
                <RenderedMarkdown markdown={markdown}/>
                <CodeForm challengeName={challengeDetails.name} categoryName={categorieDetails.name}
                          templates={challengeDetails.templates}/>
            </div>
        </>
    );
}