"use client"
import {CategoryDetails, ChallengeDetails} from "@/utils/typecollection";

export function getTotalCategorySolved(category: CategoryDetails){
    return category.challenges.filter((challenge) => isChallengeSolved(challenge)).length;
}

export function getTotalCategoryChallenges(category: CategoryDetails){
    return category.challenges.length;
}

export function getCategorySolvedPercent(category: CategoryDetails): number {
    return Math.round((getTotalCategorySolved(category) / getTotalCategoryChallenges(category)) * 100);
}

export function getTotalSolved(categories: CategoryDetails[]): number {
    const allChallenges = categories.flatMap((category) => category.challenges);
    return allChallenges.filter((challenge) => isChallengeSolved(challenge)).length;
}

export function getTotalChallenges(categories: CategoryDetails[]): number {
    return categories.flatMap((category) => category.challenges).length;
}

export function getSolvedPercent(categories: CategoryDetails[]): number {
    return Math.round((getTotalSolved(categories) / getTotalChallenges(categories)) * 100);
}


export function isChallengeSolved(challenge: ChallengeDetails){
    return global?.localStorage?.getItem(`progress_${challenge.categoryRef}/${challenge.name}`) === "solved";
}