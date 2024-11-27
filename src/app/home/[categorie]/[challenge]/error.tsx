'use client' // Error boundaries must be Client Components

import React, {useEffect} from 'react'
import Link from "next/link";
import OpenIcon from "@/app/ui/icons/open";

export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="grid h-screen place-content-center bg-white px-4">
            <div className="text-center">
                <h1 className="text-9xl font-black text-gray-200">500</h1>

                <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Uh-oh!</p>

                <p className="flex flex-col items-center justify-center mt-4 text-gray-500">Interner Server Fehler klicke
                    <Link
                        target={"_blank"}
                        rel="noopener noreferrer"
                        className={"hover:underline"}
                        href={"https://github.com/JavaChallenges/Interface/issues/new?assignees=&labels=bug%2C+needs-review&projects=&template=bug_report.md&title=%5BBUG%5D+DEIN+TITEL"}
                    >
                        <span className={"flex items-center"}> hier<OpenIcon className={'size-2.5 ml-1'}/> </span>
                    </Link>um den Fehler zu melden.
                </p>
                <button onClick={reset}
                        className="mt-6 inline-block rounded bg-primary-100 px-5 py-3 text-sm font-medium text-white hover:bg-primary-200 focus:outline-none focus:ring"
                >
                    Seite neu laden
                </button>
            </div>
        </div>
    )
}