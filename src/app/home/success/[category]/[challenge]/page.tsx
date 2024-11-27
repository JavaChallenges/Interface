"use server"
import React from "react";
import {Progress} from "@/app/ui/progress";
import {loadCategoryDetails, loadChallengeDetails} from "@/app/home/challengeloader";
import {notFound} from "next/navigation";
import {loadCategories} from "@/app/backend/IO";
import {CategoryDetails} from "@/utils/typecollection";
import {SuccessCard} from "@/app/home/success/[category]/[challenge]/successCard";
import {ProgressNotifications} from "@/app/home/success/[category]/[challenge]/progressNotifications";

export default async function Success({params,}: { params: Promise<{ category: string, challenge: string }> }) {
    const categoryName = (await params).category;
    const challengeName = (await params).challenge;
    const challengeDetails = await loadChallengeDetails(categoryName, challengeName);
    const categoryDetails = await loadCategoryDetails(categoryName);
    const categoryNames = await loadCategories();
    const categories = (await Promise.all(categoryNames.map((category: string) => loadCategoryDetails(category))))
        .filter((category): category is CategoryDetails => category !== null);
    if(!categoryDetails?.challenges){
        return notFound();
    }
    if(!challengeDetails){
        return notFound();
    }
    return (
        <div className={"h-full overflow-y-auto pr-4"}>
            <div className={"h-full w-full grid grid-cols-3 grid-rows-24"}>
                <span className={"row-span-15 col-span-2 mx-5"}>
                    <SuccessCard categoryDetails={categoryDetails} challengeDetails={challengeDetails}/>
                </span>
                <Progress className={"row-span-23"} categorys={categories} challenges={categoryDetails?.challenges}/>
                <span className={"col-span-2"}/>
                <span className={"row-span-8 col-span-2 grid gap-x-6 grid-rows-10 grid-cols-2"}>
                    <ProgressNotifications allCategories={categories} categoryDetails={categoryDetails}/>
                </span>
            </div>
        </div>
    );
}