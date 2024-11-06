import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="grid h-full w-full place-content-center px-4 bg-lightShades-100 dark:bg-darkShades-100 dark:text-darkShades-100">
            <div className="text-center">
                <h1 className="text-9xl font-black text-lightShades-200 dark:text-darkShades-200">404</h1>

                <p className="text-2xl font-bold tracking-tight sm:text-4xl text-darkShades-100 dark:text-lightShades-100">Uh-oh!</p>

                <p className="mt-4 text-darkShades-300 dark:text-lightShades-300">Kategorie kann nicht gefunden werden</p>

                <Link
                    href="/home"
                    className="mt-6 inline-block rounded px-5 py-3 text-sm font-medium focus:outline-none text-lightShades-100 bg-primary-100 hover:bg-primary-200 focus:ring"
                >
                    Zurück zur Übersicht
                </Link>
            </div>
        </div>
    )
}