import Breadcrumps from "@/app/ui/breadcrumps";

import {loadCategories, loadCategoryDetails, loadMarkdown} from "@/app/home/actions";
import Slider from "@/app/ui/slider";
import Challenge from "@/app/ui/challengepreview";
import RenderedMarkdown from "@/app/ui/markdown";
import Link from "next/link";
import Divider from "@/app/ui/divider";
export const revalidate = 0;

export default async function Page() {
    const categories = await loadCategories();
    const markdown = await loadMarkdown("");
    return (
        <>
            <Breadcrumps />
            <div className={"h-full overflow-y-auto pt-6"}>
                <RenderedMarkdown markdown={markdown}/>
                {categories.map((category, index) => (
                  <CategoryCarousel className={"mb-10"} key={index} category={category}/>
                ))}
            </div>
        </>
    );
}


async function CategoryCarousel({category, className}: {className?: string, category: string}) {
    const details = await loadCategoryDetails(category);
    if(!details || !details.challenges){
        return null;
    }
    return (
        <div className={className}>
            <Divider content={
                <Link href={`/home/${category}`} className={"font-medium text-xl text-darkShades-100 dark:text-lightShades-100"}>{details.category}</Link>
            }/>
            <div className={"text-center text-darkShades-500 dark:text-lightShades-400"}>{details.shortDescription}</div>
            <Slider content={details.challenges.map(challenge => (
                <Challenge key={challenge.name} challenge={challenge} category={category} />
            ))}/>
        </div>
    )
}