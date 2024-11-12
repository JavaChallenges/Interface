import {loadAllChallenges} from "@/app/home/actions";
import fs from "fs";
import {ChallengeDetails, Tag} from "@/utils/typecollection";

export async function loadAllTags():Promise<Tag[]>{
    const tags:Tag[] = []
    const json = JSON.parse(await fs.promises.readFile("./challenges/tags.json", 'utf-8'));
    for (const tag in json) {
        const entry = json[tag];
        const key = Object.keys(entry)[0]
        tags.push({name: key, color: json[tag][key]});
    }
    return tags;
}

function containesTag(tag: Tag, tags: Tag[]): boolean {
    for (const t of tags) {
        if (t.name === tag.name) {
            return true;
        }
    }
    return false;
}

export async function getAllTagedChallenges(tag: Tag): Promise<ChallengeDetails[]> {
    const challenges = await loadAllChallenges();
    const taggedChallenges:ChallengeDetails[] = [];
    for (const challenge of challenges) {
        if (challenge.tags && containesTag(tag, challenge.tags)) {
            taggedChallenges.push(challenge);
        }
    }
    return taggedChallenges;
}

export async function getTagForName(tagname: string){
    return (await loadAllTags()).find(tag => tag.name === tagname);
}

export async function matchColorToTagName(name: string): Promise<string> {
    const tags = await loadAllTags();
    for (const tag of tags) {
        if (tag.name === name) {
            return tag.color;
        }
    }
    return "#000000";
}

export async function loadUsedAllTags(){
    const challenges = await loadAllChallenges();
    const tags = await loadAllTags();
    const usedTags:{amount: number, tag: Tag}[] = [];
    for (const tag of tags) {
        for(const challenge of challenges){
            if(challenge.tags && containesTag(tag, challenge.tags)){
                let found = false;
                for(const usedTag of usedTags){
                    if(usedTag.tag.name === tag.name){
                        usedTag.amount++;
                        found = true;
                    }
                }
                if(!found){
                    usedTags.push({amount: 1, tag: tag});
                }
            }
        }
    }
    return usedTags;
}