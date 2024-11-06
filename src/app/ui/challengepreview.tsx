import Difficulty from "@/app/ui/difficulty";
import BadgeIcon from "@/app/ui/icons/badge";

export default function Challenge({challenge, category, className}: {className?: string, challenge: {name: string, shortDescription: string, friendlyName: string, difficulty: number}, category: string}) {
    return (
        <div className={className}>
            <article
                className="rounded-xl border-2 flex flex-col border-lightShades-300 dark:accent-darkShades-300 bg-lightShades-100 dark:bg-darkShades-100 text-darkShades-100 dark:text-lightShades-100">
                <div className="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
                    <div>
                        <h3 className="font-medium text-inherit sm:text-lg">
                            <a href={`/home/${category}/${challenge.name}`}
                               className="hover:underline"> {challenge.friendlyName} </a>
                        </h3>
                        <div className="flow-root">
                            <dl className="-my-3 text-inherit divide-y divide-gray-100 text-sm grow">

                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-2 sm:gap-4">
                                    <dt className="font-medium text-inherit">Schwierigkeit</dt>
                                    <Difficulty className={"ml-auto"}
                                                difficulty={challenge.difficulty} size={3}/>
                                </div>

                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-inherit">Beschreibung</dt>
                                    <dd className="dark:text-lightShades-200 text-darkShades-200 sm:col-span-2 text-right">{challenge.shortDescription}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
                <Badge/>
            </article>
        </div>
    )
}

function Badge() {
    return (
        <div className="flex justify-end mt-auto hidden">
            <strong
                className="-mb-[2px] -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl bg-green-600 px-3 py-1.5 text-white"
            >
                <BadgeIcon className="size-4"/>

                <span className="text-[10px] font-medium sm:text-xs">Gelöst</span>
            </strong>
        </div>
    )
}