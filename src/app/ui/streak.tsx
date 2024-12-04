"use client"
import React, {useEffect, useState} from "react";
import Image from "next/image";
import {getCurrentStreak} from "@/app/backend/stats";

export default function StreakMedal({className}: {
    className?: string
}) {
    const [open, setOpen] = useState(true);
    const [streak, setStreak] = useState<null | number>(null);

    function close(event: { preventDefault: () => void; }) {
        event.preventDefault();
        setOpen(false);
    }

    useEffect(() => {
        setStreak(getCurrentStreak());
    }, []);
    if (streak) {
        return (
            <div style={{display: `${open ? "block" : "none"}`}}
                 className={`${className} absolute left-0 top-0 h-screen w-screen bg-white dark:bg-darkShades-100 bg-opacity-5 dark:bg-opacity-30 backdrop-blur-[2px] drop-shadow-lg`}>
                <div className={`relative w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}>
                    <Image
                        width={100}
                        height={100}
                        src="/Streak_Medal.svg"
                        className={"w-full h-full absolute"}
                        alt="My Happy SVG"
                    />
                    <div
                        className={"absolute top-0 w-full h-full flex flex-col justify-center items-center text-white "}>
                        <p
                            style={{textShadow: "rgb(179 132 37) -6px 3px 0px"}}
                            className={"text-center align-middle text-9xl font-bold"}>
                            {streak}
                        </p>
                        <p
                            style={{textShadow: "rgb(179, 132, 37) -3px 2px 0px"}}
                            className={"text-center text-4xl font-bold"}>{streak == 1 ? "TAG" : "TAGE"}</p>
                    </div>
                </div>
                <button onClick={close} className="
                bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
                relative left-1/2 -translate-x-1/2 -bottom-11
            ">Ok
                </button>
            </div>
        )
    } else {
        return null;
    }
}