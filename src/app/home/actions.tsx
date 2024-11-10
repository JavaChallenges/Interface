import fs from "fs";
import {
    CategoryDetails,
    ChallengeDetails,
    JSONObject,
    JSONValue,
    SidebarEntry,
    SidebarInfo, Template
} from "@/app/typecollection";

export async function loadCategoryDetails(category: string): Promise<CategoryDetails> {
    try {
     const categoryConfigJSON = await readJsonFile(`./challenges/${category}/config.json`);
        return {
            name: category,
            friendlyName: categoryConfigJSON.friendlyName as string,
            shortDescription: categoryConfigJSON.shortDescription as string,
            challenges: await loadAllChallengesOfCategory(category)
        };
    }catch (err) {
        console.error('Error reading directory:', err);
        throw err;
    }
}

export async function loadCategories(): Promise<string[]> {
    const files = await fs.promises.readdir("./challenges", { withFileTypes: true });
    return files.filter(file => file.isDirectory()).map(folder => folder.name)
}

async function loadAllChallengesOfCategory(categoryName: string) :Promise<ChallengeDetails[]> {
    try {
        const result: ChallengeDetails[] = [];

        const challengeFiles = await fs.promises.readdir(`./challenges/${categoryName}`, { withFileTypes: true });
        const challengeNames = challengeFiles.filter(file => file.isDirectory()).map(folder => folder.name);

        for(const challengeName of challengeNames) {
            result.push(await loadChallengeDetails(categoryName, challengeName));
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
            const category: SidebarEntry = {name: categoryName, friendlyName: categoryConfigJSON.friendlyName as string};

            const challengeFiles = await fs.promises.readdir(`./challenges/${categoryName}`, { withFileTypes: true });
            const challengeNames = challengeFiles.filter(file => file.isDirectory()).map(folder => folder.name);

            for(const challengeName of challengeNames) {
                category.challenges = category.challenges || [];
                category.challenges.push(await loadChallengeDetails(categoryName, challengeName));
            }

            result.push(category);
        }
        return result;
    } catch (err) {
        console.error('Error reading directory:', err);
        throw err;
    }
}


export async function loadChallengeDetails(category: string, challenge: string): Promise<ChallengeDetails> {
    try {
        const challengeConfigJSON = await readJsonFile(`./challenges/${category}/${challenge}/config.json`);
        return {
            name: challenge,
            friendlyName: challengeConfigJSON.friendlyName? challengeConfigJSON.friendlyName as string : "ERROR LOADING",
            difficulty: challengeConfigJSON.difficulty? Number.parseInt(challengeConfigJSON.difficulty as string) : 0,
            shortDescription: challengeConfigJSON.shortDescription? challengeConfigJSON.shortDescription as string : "ERROR LOADING",
            templates: challengeConfigJSON.templates? loadTemplates(challengeConfigJSON.templates as JSONValue[]): []
        };
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


export async function readJsonFile(filePath: string): Promise<JSONObject> {
    try {
        const data = await fs.promises.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading JSON file:', filePath, error);
        throw error;
    }
}


export async function loadMarkdown( path: string): Promise<string> {
    try {
        return await fs.promises.readFile(`./challenges/${path}/description.md`, 'utf-8');
    } catch (err) {
        console.error('Error reading directory:', err);
        throw err;
    }
}
