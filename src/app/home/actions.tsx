import fs from "fs";
import {
    CategoryDetails,
    ChallengeDetails,
    JSONObject,
    JSONValue,
    SidebarEntry,
    SidebarInfo, Template
} from "@/utils/typecollection";
import {matchColorToTagName} from "@/app/home/tags/[tag]/actions";

export async function loadCategoryDetails(category: string): Promise<CategoryDetails|null> {
    try {
     const categoryConfigJSON = await readJsonFile(`./challenges/${category}/config.json`);
     if(categoryConfigJSON){
         return {
             name: category,
             friendlyName: categoryConfigJSON.friendlyName as string,
             shortDescription: categoryConfigJSON.shortDescription as string,
             challenges: await loadAllChallengesOfCategory(category)
         };
     } else {
         return null;
     }
    }catch (err) {
        throw err;
    }
}

export async function loadCategories(): Promise<string[]> {
    const files = await fs.promises.readdir("./challenges", { withFileTypes: true });
    return files.filter(file => file.isDirectory()).map(folder => folder.name)
}

export async function loadAllChallenges(){
    const categories = await loadCategories();
    const result: ChallengeDetails[] = [];
    for(const category of categories) {
        const challenges = await loadAllChallengesOfCategory(category);
        result.push(...challenges);
    }
    return result;
}

async function loadAllChallengesOfCategory(categoryName: string) :Promise<ChallengeDetails[]> {
    try {
        const result: ChallengeDetails[] = [];

        const challengeFiles = await fs.promises.readdir(`./challenges/${categoryName}`, { withFileTypes: true });
        const challengeNames = challengeFiles.filter(file => file.isDirectory()).map(folder => folder.name);

        for(const challengeName of challengeNames) {
            const challengeDetails = await loadChallengeDetails(categoryName, challengeName);
            if(challengeDetails){
                result.push(challengeDetails);
            }
        }

        return result;
    } catch (err) {
        console.error('Error reading directory:', err);
        throw err;
    }
}

export async function loadSidebarInformation(): Promise<SidebarInfo> {
    try {
        const result: SidebarInfo = [];

        const files = await fs.promises.readdir("./challenges", { withFileTypes: true });
        const categorieNames = files.filter(file => file.isDirectory()).map(folder => folder.name);

        result.push({name: '/', friendlyName: 'Übersicht'});
        for (const categoryName of categorieNames) {
            const categoryConfigJSON = await readJsonFile(`./challenges/${categoryName}/config.json`);
            if(categoryConfigJSON){
                const category: SidebarEntry = {name: categoryName, friendlyName: categoryConfigJSON.friendlyName as string};

                const challengeFiles = await fs.promises.readdir(`./challenges/${categoryName}`, { withFileTypes: true });
                const challengeNames = challengeFiles.filter(file => file.isDirectory()).map(folder => folder.name);

                for(const challengeName of challengeNames) {
                    category.challenges = category.challenges || [];
                    const challengeDetails = await loadChallengeDetails(categoryName, challengeName);
                    if(challengeDetails){
                        category.challenges.push(challengeDetails);
                    }
                }

                result.push(category);
            }
        }
        return result;
    } catch (err) {
        console.error('Error reading directory:', err);
        throw err;
    }
}


export async function loadChallengeDetails(category: string, challenge: string): Promise<ChallengeDetails|null> {
    try {
        const challengeConfigJSON = await readJsonFile(`./challenges/${category}/${challenge}/config.json`);
        if(challengeConfigJSON){
            const tags = [];
            if(challengeConfigJSON.tags){
                for (const tag of (challengeConfigJSON.tags as JSONValue[])) {
                    tags.push({
                        name: tag as string,
                        color: (await matchColorToTagName(tag as string))
                    });
                }
            }
            return {
                name: challenge,
                friendlyName: challengeConfigJSON.friendlyName? challengeConfigJSON.friendlyName as string : "ERROR LOADING",
                difficulty: challengeConfigJSON.difficulty? Number.parseInt(challengeConfigJSON.difficulty as string) : 0,
                shortDescription: challengeConfigJSON.shortDescription? challengeConfigJSON.shortDescription as string : "ERROR LOADING",
                templates: challengeConfigJSON.templates? loadTemplates(challengeConfigJSON.templates as JSONValue[]): [],
                tags: challengeConfigJSON.tags? tags : [],
                categoryRef: category
            };
        } else {
            return null;
        }
    } catch (err) {
        console.error('Error reading directory:', err);
        throw err;
    }
}

function loadTemplates(templates:JSONValue[]): Template[] {
    const templateArray: Template[] = [];
    for(const template of templates) {
        const templateObject = template as JSONObject;
        templateArray.push({
            title: templateObject.title as string,
            content: templateObject.content as string,
            classname: templateObject.classname as string,
            whitelist: templateObject.whitelist? templateObject.whitelist as string[] : []
        });
    }
    return templateArray;
}


export async function readJsonFile(filePath: string): Promise<JSONObject|null> {
    try {
        const data = await fs.promises.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch {
        console.error('Error reading JSON file unknown file for:', filePath);
        return null;
    }
}


export async function loadMarkdown( path: string): Promise<string|null> {
    try {
        return await fs.promises.readFile(`./challenges/${path}/description.md`, 'utf-8');
    } catch {
        console.error('Error reading directory markdown unknown for:', path);
        return null
    }
}
