import {ChallengeDetails, JSONObject, JSONValue, Template} from "@/utils/typecollection";
import fs, {readFileSync} from "fs";
import {loadChallengeDetails} from "@/app/home/challengeloader";


export async function readJsonFile(filePath: string): Promise<JSONObject|null> {
    try {
        const data = await fs.promises.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch {
        console.error('Error reading JSON file:', filePath);
        return null;
    }
}


export async function loadMarkdown( path: string): Promise<string|null> {
    try {
        return await fs.promises.readFile(path, 'utf-8');
    } catch {
        console.error('Error reading markdown file: ', path);
        return null
    }
}


export function loadTemplates(templates:JSONValue[], path:string): Template[] {
    const templateArray: Template[] = [];
    for(const template of templates) {
        const templateObject = template as JSONObject;
        let content = templateObject.content as string;
        if(content.endsWith(".java")){
            content = readFileSync(`${path}/templates/${content}`, 'utf-8');
        }
        templateArray.push({
            title: templateObject.title as string,
            content: content,
            classname: templateObject.classname as string,
            whitelist: templateObject.whitelist? templateObject.whitelist as string[] : []
        });
    }
    return templateArray;
}



export async function loadCategories(): Promise<string[]> {
    try {
        const files = await fs.promises.readdir("./challenges", { withFileTypes: true });
        return files.filter(file => file.isDirectory()).map(folder => folder.name)
    } catch (err) {
        console.error('Error reading categories:', err);
        return [];
    }
}



export async function loadAllChallengesOfCategory(categoryName: string) :Promise<ChallengeDetails[]> {
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

