"use client";
import Toggle from "@/app/ui/toggle";
import {useTheme} from "next-themes";

export default function Theme() {
    const {theme, setTheme} = useTheme();
    return (

        <div className={"flex justify-items-center justify-between px-5 py-3"}><p>Darkmode: </p> <Toggle
            checked={theme === "dark"} toggleAction={() => theme == "dark" ? setTheme('light') : setTheme("dark")}/>
        </div>
    );
}