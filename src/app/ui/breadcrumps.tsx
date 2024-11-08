import Link from "next/link";
import HomeIcon from "@/app/ui/icons/home";

export default function Breadcrumps({path}: { path?: {ref: string, friendlyName: string}[]}) {

    return (
    <nav className={"" +
        "absolute mb-1 pb-1 pr-2 rounded-br-md " +
        "bg-white dark:bg-darkShades-100 bg-opacity-30 dark:bg-opacity-30 backdrop-blur-lg drop-shadow-lg" +
        ""} aria-label="Breadcrumb">
        <ol className="
        flex items-center gap-1 text-sm
        text-darkShades-100 dark:text-lightShades-100"
        >
            <li>
                <Link href="/home" className="block transition text-darkShades-100 hover:text-primary-200 dark:text-lightShades-100 dark:hover:text-primary-100">
                    <span className="sr-only"> Home </span>

                    <HomeIcon className={"size-4"}/>
                </Link>
            </li>
            {path?path.map((item, index) => {
                return <Breadcrum key={index} name={item.friendlyName} link={item.ref}/>;
            }):""}
        </ol>
    </nav>
    )
}

function Breadcrum({name, link}: {name: string, link: string}) {
    return (
        <>
            <li className="rtl:rotate-180">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                    />
                </svg>
            </li>

            <li>
                <Link href={`/home/${link}`} className="block transition text-darkShades-100 hover:text-primary-200 dark:text-lightShades-100 dark:hover:text-primary-100">{name}</Link>
            </li>
        </>
    )
}