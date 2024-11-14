import GitHubIcon from "@/app/ui/icons/github";
import Link from "next/link";

export function Footer() {
  return (
      <footer className={"flex justify-end h-[20px]"}>
          <div className={"mx-1 text-xs text-gray-500 dark:text-gray-400"}>
              <Link className={"hover:underline"} href="/impressum">Impressum</Link>
          </div>
          <div className={"mx-1 text-xs text-gray-500 dark:text-gray-400"}>
              <a href="https://github.com/JavaChallenges" target="_blank" rel="noopener noreferrer"><GitHubIcon
                  className={"size-4"}/></a>
          </div>
          <div className={"mx-1 text-xs text-gray-500 dark:text-gray-400"}>
              © 2024 by <a className={"hover:underline"} href="https://www.github.com/YannicHock" target="_blank" rel="noopener noreferrer">Yannic
              Hock</a>
          </div>
      </footer>
  );
}