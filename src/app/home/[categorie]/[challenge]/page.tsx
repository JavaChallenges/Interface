
import Breadcrumps from "@/app/ui/breadcrumps";
import {loadCategoryDetails, loadChallengeDetails, loadMarkdown} from "@/app/home/actions";
import RenderedMarkdown from "@/app/home/ui/markdown";
import {CodeForm} from "@/app/home/[categorie]/[challenge]/codeform";
import {notFound} from "next/navigation";
import {Title} from "@/app/home/[categorie]/[challenge]/title";

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
                <CodeForm challengePath={`${categorieDetails.name}/${challengeDetails.name}`} templates={challengeDetails.templates}/>
            </div>
        </>
    );
}