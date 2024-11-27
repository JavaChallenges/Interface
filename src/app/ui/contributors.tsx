import {Contribrutor} from "@/utils/typecollection";
import Link from "next/link";
import Image from "next/image";

export default function Contributors({contributorsInterface, contributorsChallenges}: {
    contributorsInterface: Contribrutor[],
    contributorsChallenges: Contribrutor[]
}) {
    return (
        <>
            <h3 className={"text-xl font-bold mb-2"}>Mitwirkende:</h3>
            <div className={"flex flex-col gap-4"}>
                <ContributionCategory title={"Interface"} contributors={contributorsInterface}/>
                <ContributionCategory title={"Challenges"} contributors={contributorsChallenges}/>
            </div>
        </>
    );
}

function ContributionCategory({contributors, title}: { contributors: Contribrutor[], title: string }) {
    return (
        <div className={"flex flex-col"}>
            <h3 className={"text-xl mb-2"}>{title}</h3>
            <div className={"flex flex-row gap-3"}>
                {contributors.map((contributor, index) => <Contributor key={index} contributor={contributor}/>)}
            </div>
        </div>
    )
}

function Contributor({contributor}: { contributor: Contribrutor }) {
    return (
        contributor.type === "User" ?
            <div className="flex items-center gap-4">
                <Image
                    src={contributor.avatar_url}
                    alt={contributor.name}
                    width={100}
                    height={100}
                    className="size-10 rounded-lg object-cover"
                />

                <div>
                    <Link href={contributor.url}><h4
                        className="text-lg/tight font-medium hover:underline text-darkShades-100 dark:text-lightShades-100">{contributor.name}</h4>
                    </Link>

                    <p className="mt-0.5 text-sm text-darkShades-300 dark:text-lightShades-300">
                        Contributions: {contributor.contributions}
                    </p>
                </div>
            </div> : null
    )
}


