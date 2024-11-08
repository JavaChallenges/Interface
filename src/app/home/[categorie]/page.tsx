import Breadcrumps from "@/app/ui/breadcrumps";
import {loadCategoryDetails, loadMarkdown} from "@/app/home/actions";
import {notFound} from "next/navigation";
import RenderedMarkdown from "@/app/home/ui/markdown";
import Challenge from "@/app/home/ui/challengepreview";

export default async function Page({params,}: { params: Promise<{ categorie: string}> }) {
    const categorie = (await params).categorie
    const details = await loadCategoryDetails(categorie);
    const markdown = await loadMarkdown(categorie);
    if(!details || !details.challenges){
        return notFound();
    }
    const path = [
        {ref: categorie, friendlyName: details.friendlyName},
    ]
    return (
        <>
            <Breadcrumps path={path}/>
            <div className={"h-full overflow-y-auto pt-6 pr-4 pb-6"}>
                <h1 className="text-3xl font-bold text-darkShades-100 dark:text-lightShades-100 mb-2">{details.friendlyName}</h1>
                <RenderedMarkdown markdown={markdown}/>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
                    {details.challenges.map(challenge => (
                        <Challenge key={challenge.name} challenge={challenge} category={categorie}/>
                    ))}
                </div>
            </div>
        </>
    );
}