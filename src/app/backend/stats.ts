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

export function canContinueStreak() {
    const streakString = global?.localStorage?.getItem("streak");
    const yesterday = getDateString(new Date(Date.now() - 86400000));
    if (streakString) {
        return streakString.includes(yesterday);
    }
    return false;
}


export function hasContinuedStreak() {
    const streakString = global?.localStorage?.getItem("streak");
    const today = getDateString(new Date(Date.now()));
    if (streakString) {
        return streakString.includes(today);
    }
    return false;
}

export function getCurrentStreak() {
    const streakString = global?.localStorage?.getItem("streak");
    if (canContinueStreak() || hasContinuedStreak()) {
        if (streakString) {
            return streakString.split(",").length;
        }
    }
    return 0;
}

export function incrementStreak() {
    const currentStreak = global?.localStorage?.getItem("streak");
    if (canContinueStreak() && !hasContinuedStreak()) {
        global?.localStorage?.setItem("streak", `${currentStreak},${getDateString(new Date())}`);
        return true;
    } else if (!hasContinuedStreak()) {
        global?.localStorage?.setItem("streak", `${getDateString(new Date())}`);
        return true;
    }
    return false;
}

export function resetStreak() {
    const streakString = global?.localStorage?.getItem("streak");
    const highest = getHighestStreak();
    if (streakString) {
        if ((streakString?.split(",").length) > highest) {
            global?.localStorage?.setItem("highestStreak", String(streakString.split(",").length));
        }
    }
    global?.localStorage?.removeItem("streak");
}

export function getHighestStreak(): number {
    return <number><unknown>global?.localStorage?.getItem("highestStreak") || 0;
}


function getDateString(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}