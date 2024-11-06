import fs from "fs";


export async function loadMarkdown( path: string): Promise<any> {
    try {
        return await fs.promises.readFile(`./challenges/${path}/description.md`, 'utf-8');
    } catch (err) {
        console.error('Error reading directory:', err);
    }
}


export async function loadCategoryDetails(category: string): Promise<{name: string, category: string, shortDescription: string, challenges: {shortDescription: string, name: string, friendlyName: string, difficulty: number}[] | null} | null> {
    try {
     const categoryConfigJSON = await readJsonFile(`./challenges/${category}/config.json`);
        return {
            name: category,
            category: categoryConfigJSON.friendlyName,
            shortDescription: categoryConfigJSON.shortDescription,
            challenges: await loadCategoryChallenges(category)
        };
    }catch (err) {
        console.error('Error reading directory:', err);
        return null;
    }
}

export async function loadCategories(): Promise<string[]> {
    const files = await fs.promises.readdir("./challenges", { withFileTypes: true });
    return files.filter(file => file.isDirectory()).map(folder => folder.name)
}

async function loadCategoryChallenges(categoryName: string) :Promise<{name: string, friendlyName: string, difficulty: number, shortDescription: string}[] | null> {
    try {
        const result: {name: string, shortDescription: string, friendlyName: string, difficulty: number}[] = [];

        const challengeFiles = await fs.promises.readdir(`./challenges/${categoryName}`, { withFileTypes: true });
        const challengeNames = challengeFiles.filter(file => file.isDirectory()).map(folder => folder.name);

        for(const challengeName of challengeNames) {
            const challengeConfigJSON = await readJsonFile(`./challenges/${categoryName}/${challengeName}/config.json`);
            const challenge = {
                name: challengeName,
                friendlyName: challengeConfigJSON.friendlyName,
                shortDescription: challengeConfigJSON.shortDescription? challengeConfigJSON.shortDescription : "-/-",
                difficulty: Number.parseInt(challengeConfigJSON.difficulty)
            };
            result.push(challenge);
        }

        return result;
    } catch (err) {
        console.error('Error reading directory:', err);
        return null;
    }
}

export async function loadChallengeDetails(category: string, challenge: string): Promise<any> {
    try {
        const categoryConfigJSON = await readJsonFile(`./challenges/${category}/config.json`);
        const challengeConfigJSON = await readJsonFile(`./challenges/${category}/${challenge}/config.json`);
        return {
            category: categoryConfigJSON.friendlyName,
            challenge: challengeConfigJSON.friendlyName,
            difficulty: challengeConfigJSON.difficulty,
            templates: challengeConfigJSON.templates
        };
    } catch (err) {
        console.error('Error reading directory:', err);
    }
}

export async function loadSidebarInformation(): Promise<any> {
    try {
        const result: {name: string, friendlyName: string, challenges?: {name: string, friendlyName: string}[]}[] = [];

        const files = await fs.promises.readdir("./challenges", { withFileTypes: true });
        const categorieNames = files.filter(file => file.isDirectory()).map(folder => folder.name);

        result.push({name: '/', friendlyName: 'Übersicht'});
        for (const categoryName of categorieNames) {
            const categoryConfigJSON = await readJsonFile(`./challenges/${categoryName}/config.json`);
            const category: {name: string, friendlyName: string, challenges?:{name: string, friendlyName:string}[]} = {name: categoryName, friendlyName: categoryConfigJSON.friendlyName};

            const challengeFiles = await fs.promises.readdir(`./challenges/${categoryName}`, { withFileTypes: true });
            const challengeNames = challengeFiles.filter(file => file.isDirectory()).map(folder => folder.name);

            for(const challengeName of challengeNames) {
                const challengeConfigJSON = await readJsonFile(`./challenges/${categoryName}/${challengeName}/config.json`);
                const challenge = {name: challengeName, friendlyName: challengeConfigJSON.friendlyName, difficulty: Number.parseInt(challengeConfigJSON.difficulty)};
                if (!category.challenges) category.challenges = [];
                category.challenges.push(challenge);
            }

            result.push(category);
        }
        return result;
    } catch (err) {
        console.error('Error reading directory:', err);
    }
}


async function readJsonFile(filePath: string): Promise<any> {
    try {
        const data = await fs.promises.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading JSON file:', filePath, error);
        throw error;
    }
}
