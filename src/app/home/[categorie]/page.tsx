import Breadcrumps from "@/app/ui/breadcrumps";
import {loadCategoryDetails} from "@/app/home/actions";

export default async function Page({params,}: { params: Promise<{ categorie: string}> }) {
    const categorie = (await params).categorie
    const details = await loadCategoryDetails(categorie);
    const path = [
        {ref: categorie, name: details.category},
    ]
    return (
        <>
            <Breadcrumps path={path}/>
            <div className={"h-full overflow-y-auto pt-6"}>
                {details.category}
            </div>
        </>
    );
}