"use client"
import Link from "next/link";
import {usePathname} from "next/navigation";
import Difficulty from "@/app/ui/difficulty";

export default function Sidemenu(categories: { categories: { name: string, friendlyName: string,  challenges?: { name: string, friendlyName: string, difficulty: number }[]}[]}) {

    const pathname = usePathname()
    return (
        <ul className="space-y-1">
            {categories["categories"].map((categorie) => {
                if (categorie.challenges) {
                    return challenges(categorie.friendlyName, categorie.name, categorie.challenges ,pathname,  pathname.includes(categorie.name) );
                } else {
                    return simpleCategorie(categorie.name, categorie.friendlyName, (pathname.includes(categorie.name) && categorie.name !== "/") || (pathname === "/home" && categorie.name === "/"));
                }
            })}
        </ul>
    );
}

function simpleCategorie(name: string, friendlyName: string, active: boolean) {
    return (
        <li>
            <Link href={`/home/${name}`}
                  className={
                                `block rounded-lg px-4 py-2 text-sm font-medium
                                ${active ? "bg-lightShades-100 dark:bg-darkShades-500" : ""}
                                text-darkShades-100 dark:text-lightShades-100
                                hover:bg-lightShades-100 dark:hover:bg-darkShades-500`
                            }>
                {friendlyName}
            </Link>
        </li>
    );
}

function challenges(friendlyName: string, categoryName: string, challenges: {
    name: string,
    friendlyName: string,
    difficulty: number
}[], currentCategorie: string, active: boolean) {
    return (
        <li>
            <details open={active} className="group [&_summary::-webkit-details-marker]:hidden">
            <summary
                    className={`flex cursor-pointer items-center justify-between rounded-lg px-4 py-2
                                ${active ? "bg-lightShades-100 dark:bg-darkShades-500" : ""}
                                text-darkShades-100 dark:text-lightShades-100
                                hover:bg-lightShades-100 dark:hover:bg-darkShades-500
                            `}
                >
                    <span className="text-sm font-medium"> {friendlyName} </span>

                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="size-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                      >
                        <path
                            fill-rule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                </summary>

                <ul className="mt-2 space-y-1 px-4">
                    {challenges.map((challenge) => challengeEntry(challenge.name, categoryName, challenge.friendlyName, challenge.difficulty, active && currentCategorie.includes(challenge.name)))}
                </ul>
            </details>
        </li>
    );
}

function challengeEntry(name: string, categorieName: string, friendlyName: string, difficulty: number, active: boolean) {
    return (
        <li>
            <Link
                href={`/home/${categorieName}/${name}`}
                className={`
                    block rounded-lg px-4 py-2 text-sm font-medium
                    ${active ? "bg-lightShades-100 dark:bg-darkShades-500" : ""}
                    text-darkShades-100 dark:text-lightShades-100
                    hover:bg-lightShades-100 dark:hover:bg-darkShades-500
                `}
            >
                {friendlyName}
            </Link>
        </li>
    );
}