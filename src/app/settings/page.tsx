"use client"
import Toggle from "@/app/ui/toggle";
import { useTheme } from "next-themes";

export default function Settings() {
    const { theme, setTheme } = useTheme();
    return (
        <div>
            <Toggle toggleAction={() => theme == "dark"? setTheme('light'): setTheme("dark")}/>
        </div>
    );
}
