"use client"
import Link from "next/link";
import {usePathname} from "next/navigation"

export default function Header(pages: {pages:{ref:string, friendlyName:JSX.Element}[]}) {
    const pathname = usePathname()
    //Element(page.friendlyName, page.link, )
    const elements= pages['pages'].map((page: { friendlyName: JSX.Element; ref: string; }, index) => (<Element key={index} friendlyName={page.friendlyName} ref={page.ref} currentPage={pathname.includes(page.ref.toLowerCase())}/>) );
    return (
        <header className="bg-lightShades-200 dark:bg-darkShades-200 p-3 justify-items-center">
            <div className="hidden sm:block">
                <nav className="flex gap-6 " aria-label="Tabs">
                    {elements}
                </nav>
            </div>
        </header>
    );
}

function Element({friendlyName, ref, currentPage}:{friendlyName: JSX.Element, ref: string, currentPage: boolean}){
    return (
        <Link
            href={`/${ref}`}
            className={`
            inline-flex shrink-0 items-center
            rounded-lg p-2 text-sm font-medium
            text-darkShades-100 dark:text-lightShades-100
            ${currentPage ? "" : "hover:bg-lightShades-100 dark:hover:bg-darkShades-100 hover:text-lightShades-500 dark:hover:text-lightShades-200"}
            ${currentPage ? "bg-primary-50 text-primary-400" : ""}
            `}
            aria-current={currentPage ? "page" : undefined}
        >
            {friendlyName}
        </Link>
    )
}