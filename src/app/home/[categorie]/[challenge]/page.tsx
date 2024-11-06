import Breadcrumps from "@/app/ui/breadcrumps";
import {loadChallengeDetails, loadMarkdown} from "@/app/home/actions";
import RenderedMarkdown from "@/app/ui/markdown";
import Difficulty from "@/app/ui/difficulty";
import {CodeForm} from "@/app/home/[categorie]/[challenge]/codeform";
import {notFound} from "next/navigation";

export default async function Page({params,}: { params: Promise<{ categorie: string, challenge: string }> }) {
    const categorie = (await params).categorie
    const challenge = (await params).challenge
    const details = await loadChallengeDetails(categorie, challenge);
    const markdown = await loadMarkdown(`${categorie}/${challenge}`);

    if(!details|| !markdown){
        return notFound();
    }

    const path = [
        {ref: categorie, name: details.category},
        {ref: categorie+"/"+challenge, name: details.challenge},
    ]

    return (
        <>
            <Breadcrumps path={path}/>
            <div className={"h-full overflow-y-auto pt-6 pr-4"}>
                <h1 className="text-3xl font-bold">{details.challenge} <Difficulty difficulty={details.difficulty} size={4}/></h1>
                <RenderedMarkdown markdown={markdown}/>
                <CodeForm challengePath={`${categorie}/${challenge}`} templates={details.templates}/>
            </div>
        </>
    );
}