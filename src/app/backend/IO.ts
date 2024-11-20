import {ChallengeDetails, JSONObject, JSONValue, Tag, Template} from "@/utils/typecollection";
import fs, { readFileSync } from "fs";
import { loadChallengeDetails } from "@/app/home/challengeloader";
import path from "node:path";

/**
 * Reads a JSON file and parses its content.
 * @param {string} filePath - The path to the JSON file.
 * @returns {Promise<JSONObject|null>} - A promise that resolves to the parsed JSON object or null if an error occurs.
 */
export async function readJsonFile(filePath: string): Promise<JSONObject | null> {
    try {
        const data = await fs.promises.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch {
        console.error('Error reading JSON file:', filePath);
        return null;
    }
}

/**
 * Reads a markdown file and returns its content as a string.
 * @param {string} path - The path to the markdown file.
 * @returns {Promise<string|null>} - A promise that resolves to the file content or null if an error occurs.
 */
export async function loadMarkdown(path: string): Promise<string | null> {
    try {
        return await fs.promises.readFile(path, 'utf-8');
    } catch {
        console.error('Error reading markdown file: ', path);
        return null;
    }
}

/**
 * Loads templates from a JSON array and reads their content if they are Java files.
 * @param {JSONValue[]} templates - The array of templates to load.
 * @param {string} path - The base path to the templates directory.
 * @returns {Template[]} - An array of loaded templates.
 */
export function loadTemplates(templates: JSONValue[], path: string): Template[] {
    const templateArray: Template[] = [];
    for (const template of templates) {
        const templateObject = template as JSONObject;
        let content = templateObject.content as string;
        if (content.endsWith(".java")) {
            content = readFileSync(`${path}/templates/${content}`, 'utf-8');
        }
        templateArray.push({
            title: templateObject.title as string,
            content: content,
            classname: templateObject.classname as string,
            whitelist: templateObject.whitelist ? templateObject.whitelist as string[] : []
        });
    }
    return templateArray;
}

/**
 * Loads the names of all categories (directories) in the challenges directory.
 * @returns {Promise<string[]>} - A promise that resolves to an array of category names.
 */
export async function loadCategories(): Promise<string[]> {
    try {
        const files = await fs.promises.readdir("./challenges", { withFileTypes: true });
        return files.filter(file => file.isDirectory()).map(folder => folder.name);
    } catch (err) {
        console.error('Error reading categories:', err);
        return [];
    }
}

/**
 * Loads all challenges of a given category.
 * @param {string} categoryName - The name of the category.
 * @returns {Promise<ChallengeDetails[]>} - A promise that resolves to an array of challenge details.
 * @throws Will throw an error if reading the directory fails.
 */
export async function loadAllChallengesOfCategory(categoryName: string): Promise<ChallengeDetails[]> {
    try {
        const result: ChallengeDetails[] = [];

        const challengeFiles = await fs.promises.readdir(`./challenges/${categoryName}`, { withFileTypes: true });
        const challengeNames = challengeFiles.filter(file => file.isDirectory()).map(folder => folder.name);

        for (const challengeName of challengeNames) {
            const challengeDetails = await loadChallengeDetails(categoryName, challengeName);
            if (challengeDetails) {
                result.push(challengeDetails);
            }
        }

        return result;
    } catch (err) {
        console.error('Error reading directory:', err);
        throw err;
    }
}


/**
 * Loads all tags from a JSON file.
 *
 * This function reads the `tags.json` file located in the `./challenges` directory,
 * parses its content, and constructs an array of `Tag` objects. Each `Tag` object
 * contains a `name` and a `color` property.
 *
 * @returns {Promise<Tag[]>} - A promise that resolves to an array of `Tag` objects.
 * @throws Will throw an error if reading the file fails.
 */
export async function loadAllTags(): Promise<Tag[]> {
    const tags: Tag[] = [];
    const json = JSON.parse(await fs.promises.readFile("./challenges/tags.json", 'utf-8'));
    for (const tag in json) {
        const entry = json[tag];
        const key = Object.keys(entry)[0];
        tags.push({ name: key, color: json[tag][key] });
    }
    return tags;
}

/**
 * Recursively deletes a folder and its contents.
 * @param {string} dirPath - The path to the directory to delete.
 * @returns {Promise<void>} - A promise that resolves when the directory and its contents have been deleted.
 */
export async function deleteFolderRecursive(dirPath: string): Promise<void> {
    if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath);
        for (const file of files) {
            const curPath = path.join(dirPath, file);
            if (fs.lstatSync(curPath).isDirectory()) {
                await deleteFolderRecursive(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        }
        fs.rmdirSync(dirPath);
    }
}