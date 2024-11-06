export default function HomeLayout({children,}: { children: React.ReactNode }) {
    return (
        <section className={"h-full"}>
            {children}
        </section>
    );
}