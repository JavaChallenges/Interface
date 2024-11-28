import {filterChallengesByTag, getTagForName} from "@/app/home/tags/[tag]/tagloader";
import {Challenge} from "@/app/home/ui/challengepreview";
import {RenderedTag} from "@/app/ui/rendered-tag";

export default async function Page({params,}: { params: Promise<{ tag: string}> }) {
    const atag = (await params).tag;
    const challenges = await filterChallengesByTag({name: atag, color: ""});
    const tag = await getTagForName(atag);

    return (
        <>
            <h1 className="text-3xl font-bold mb-5 flex items-center">Alle Aufgaben zu {tag?<RenderedTag className={"ml-2"} tag={tag}/>:null}</h1>
            <div className="grid lg:grid-cols-4 justify-items-center grid-cols-3 gap-4 ">
                {challenges.map((challenge, index) => {
                    return (
                        <Challenge key={index} className={"flex w-full"} challenge={challenge}
                                   category={challenge.categoryRef}/>
                    )
                })}
            </div>
        </>
    )
}