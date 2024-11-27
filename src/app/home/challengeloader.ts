import {
    CategoryDetails,
    ChallengeDetails,
    JSONValue,
    SidebarEntry,
    SidebarInfo
} from "@/utils/typecollection";
import {matchColorToTagName} from "@/app/home/tags/[tag]/tagloader";
import {loadAllChallengesOfCategory, loadCategories, loadTemplates, readJsonFile} from "@/app/backend/IO";

/**
 * Loads the details of a specific challenge within a category.
 * @param {string} category - The name of the category.
 * @param {string} challenge - The name of the challenge.
 * @returns {Promise<ChallengeDetails|null>} - A promise that resolves to the challenge details or null if not found.
 * @throws Will throw an error if reading the directory fails.
 */
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
                templates: challengeConfigJSON.templates? await loadTemplates(challengeConfigJSON.templates as JSONValue[], `./challenges/${category}/${challenge}`): [],
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

/**
 * Loads the details of a specific category.
 * @param {string} category - The name of the category.
 * @returns {Promise<CategoryDetails|null>} - A promise that resolves to the category details or null if not found.
 * @throws Will throw an error if reading the directory fails.
 */
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

/**
 * Loads all challenges across all categories.
 * @returns {Promise<ChallengeDetails[]>} - A promise that resolves to an array of all challenge details.
 */
export async function loadAllChallenges(){
    const categories = await loadCategories();
    const result: ChallengeDetails[] = [];
    for(const category of categories) {
        const challenges = await loadAllChallengesOfCategory(category);
        result.push(...challenges);
    }
    return result;
}

/**
 * Loads the sidebar information, including categories and their challenges.
 * @returns {Promise<SidebarInfo>} - A promise that resolves to the sidebar information.
 * @throws Will throw an error if reading the directory fails.
 */
export async function loadSidebarInformation(): Promise<SidebarInfo> {
    try {
        const result: SidebarInfo = [];

        const categorieNames = await loadCategories();

        result.push({name: '/', friendlyName: 'Übersicht'});
        for (const categoryName of categorieNames) {
            const challenges: ChallengeDetails[]   = await loadAllChallengesOfCategory(categoryName);
            const categoryDetails: CategoryDetails | null = await loadCategoryDetails(categoryName);
            if(!categoryDetails){
                continue;
            }
            const category: SidebarEntry = {name: categoryDetails.name, friendlyName: categoryDetails.friendlyName};
            for(const challenge of challenges){
                category.challenges = category.challenges || [];
                category.challenges.push(challenge);
            }
            result.push(category);
        }
        return result;
    } catch (err) {
        console.error('Error reading directory:', err);
        throw err;
    }
}