import Breadcrumps from "@/app/ui/breadcrumps";
export const revalidate = 0;
export default function Page() {
    return (
        <>
            <Breadcrumps />
            <div className={"h-full overflow-y-auto pt-6"}>
                Übersicht
            </div>
        </>
    );
}