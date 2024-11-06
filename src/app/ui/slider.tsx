"use client";
import Flickity from "react-flickity-component";

import "flickity/css/flickity.css";
import {ReactNode} from "react";

export default function Slider({content}: {content: ReactNode[]}) {
    const flickityOptions = {
        initialIndex: content.length > 1 ? Math.floor(content.length/2) : 0,
        pageDots: true
    }
    return (
        <Flickity
            elementType="div"
            options={flickityOptions}
            reloadOnUpdate
        >
            {content.map((element, index) => (
                <div key={index} className="w-80 mx-5">
                    {element}
                </div>
            ))}
        </Flickity>
    );
}