import Breadcrumps from "@/app/ui/breadcrumps";
import {loadCategoryDetails, loadChallengeDetails, loadMarkdown} from "@/app/home/actions";
import RenderedMarkdown from "@/app/ui/markdown";
import Difficulty from "@/app/ui/difficulty";
import {CodeForm} from "@/app/home/[categorie]/[challenge]/codeform";
import {notFound} from "next/navigation";

export default async function Page({params,}: { params: Promise<{ categorie: string, challenge: string }> }) {
    const categorieName = (await params).categorie;
    const categorieDetails = await loadCategoryDetails(categorieName);
    const challenge = (await params).challenge
    const challengeDetails = await loadChallengeDetails(categorieName, challenge);
    const markdown = await loadMarkdown(`${categorieName}/${challenge}`);

    if(!challengeDetails|| !markdown){
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
                <h1 className="text-3xl font-bold">{challengeDetails.friendlyName} <Difficulty difficulty={challengeDetails.difficulty} size={4}/></h1>
                <RenderedMarkdown markdown={markdown}/>
                <CodeForm challengePath={`${categorieDetails.name}/${challengeDetails.name}`} templates={challengeDetails.templates}/>
            </div>
        </>
    );
}