import Breadcrumps from "@/app/ui/breadcrumps";

import {loadCategories, loadCategoryDetails, loadMarkdown} from "@/app/home/actions";
import Slider from "@/app/ui/slider";
import RenderedMarkdown from "@/app/home/ui/markdown";
import Link from "next/link";
import Divider from "@/app/ui/divider";
import {Tag} from "@/utils/typecollection";
import {RenderedTag} from "@/app/ui/rendered-tag";
import {loadAllTags, loadUsedAllTags} from "@/app/home/tags/[tag]/actions";
import {Challenge} from "@/app/home/ui/challengepreview";

export const revalidate = 0;

export default async function Page() {
    const categories = await loadCategories();
    const markdown = await loadMarkdown("");

    const usedTags = await loadUsedAllTags();
    let allTags = null;
    if(process.env.NODE_ENV === "development" || process.env.INDEV){
        allTags = await loadAllTags();
    }
    return (
        <>
            <Breadcrumps/>
            <div className={"h-full overflow-y-auto pt-6 pr-4 pb-6"}>
                <RenderedMarkdown markdown={markdown ? markdown : ""}/>
                {categories.map((category, index) => (
                    <CategoryCarousel className={"mb-10"} key={index} category={category}/>
                ))}
                <p>Suche nach Tags:</p>
                <Tags usedTags={usedTags} allTags={allTags ? allTags : []}/>
            </div>
        </>
    );
}

function Tags({usedTags, allTags}: { allTags?: Tag[], usedTags: { amount: number, tag: Tag }[] }){
    return (
        <>
            {usedTags.map((usedTag, index) => {
                return (
                    <RenderedTag tag={usedTag.tag} amount={usedTag.amount} key={index.toString()}/>
                )
            })}
            {allTags && allTags.length > 0 ? <AllAvailableTags tags={allTags}/> : null}
        </>
    )
}

async function CategoryCarousel({category, className}: { className?: string, category: string }) {
    const details = await loadCategoryDetails(category);
    if(!details || !details.challenges){
        return null;
    }
    return (
        <div className={className}>
            <Divider content={
                <Link href={`/home/${category}`} className={"font-medium text-xl text-darkShades-100 dark:text-lightShades-100"}>{details.friendlyName}</Link>
            }/>
            <div className={"text-center text-darkShades-500 dark:text-lightShades-300"}>{details.shortDescription}</div>
            <Slider className={"items-center"} content={details.challenges.map((challenge) => (
                <Challenge className={""} key={challenge.name} challenge={challenge} category={category} />
            ))}/>
        </div>
    )
}



function AllAvailableTags({tags}:{tags: Tag[]}){
    return (
        <div className={"my-10"}>
            Verfügbare Tags<span className={"text-xs"}> (In Produktion ausgeblendet)</span>:<br/>
            {tags.map((tag: { name: string; color: string; }) => {
                return (
                    <RenderedTag tag={tag} key={tag.name}/>
                )
            })}
        </div>
    )
}