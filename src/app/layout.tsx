import localFont from "next/font/local";
import { ThemeProvider } from "next-themes"
import "./globals.css";
import Header from "@/app/ui/header";
import HomeIcon from "@/app/ui/icons/home";
import SettingsIcon from "@/app/ui/icons/settings";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const pages = [
        { ref: "home", friendlyName: <span className={"inline-flex shrink-0 items-center"}><HomeIcon className={"size-5 pr-1"} />  Übersicht</span> },
        {ref: "settings", friendlyName: <span className={"inline-flex shrink-0 items-center"}><SettingsIcon className={"size-5 pr-1"} />  Einstellungen</span>},
    ];
    return (
        <html suppressHydrationWarning lang="en">
        <ThemeProvider attribute="class">
              <body
                className={`${geistSans.variable} ${geistMono.variable} h-screen w-screen overflow-hidden flex-col flex bg-lightShades-100 dark:bg-darkShades-100 antialiased`}
              >
                  <Header pages={pages} />
                  {children}
              </body>
        </ThemeProvider>
    </html>
  );
}
