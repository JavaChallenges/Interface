import {loadAllChallenges} from "@/app/home/challengeloader";
import {ChallengeDetails, Tag} from "@/utils/typecollection";
import {loadAllTags} from "@/app/backend/IO";

/**
 * Checks if a given tag is present in an array of tags.
 *
 * @param {Tag} tag - The tag to check for.
 * @param {Tag[]} tags - The array of tags to search within.
 * @returns {boolean} - True if the tag is found, false otherwise.
 */
function containsTag(tag: Tag, tags: Tag[]): boolean {
    for (const t of tags) {
        if (t.name === tag.name) {
            return true;
        }
    }
    return false;
}

/**
 * Filters challenges by a specific tag.
 *
 * @param {Tag} tag - The tag to filter challenges by.
 * @returns {Promise<ChallengeDetails[]>} - A promise that resolves to an array of challenges containing the specified tag.
 */
export async function filterChallengesByTag(tag: Tag): Promise<ChallengeDetails[]> {
    const challenges = await loadAllChallenges();
    const taggedChallenges: ChallengeDetails[] = [];
    for (const challenge of challenges) {
        if (challenge.tags && containsTag(tag, challenge.tags)) {
            taggedChallenges.push(challenge);
        }
    }
    return taggedChallenges;
}

/**
 * Retrieves a tag object by its name.
 *
 * @param {string} tagname - The name of the tag to retrieve.
 * @returns {Promise<Tag | undefined>} - A promise that resolves to the tag object if found, or undefined if not found.
 */
export async function getTagForName(tagname: string) {
    return (await loadAllTags()).find(tag => tag.name === tagname);
}

/**
 * Matches a tag name to its corresponding color.
 *
 * @param {string} name - The name of the tag.
 * @returns {Promise<string>} - A promise that resolves to the color of the tag, or "#000000" if the tag is not found.
 */
export async function matchColorToTagName(name: string): Promise<string> {
    const tags = await loadAllTags();
    for (const tag of tags) {
        if (tag.name === name) {
            return tag.color;
        }
    }
    return "#000000";
}

/**
 * Loads all used tags and their usage count from challenges.
 *
 * @returns {Promise<{amount: number, tag: Tag}[]>} - A promise that resolves to an array of objects containing tags and their usage count.
 */
export async function loadUsedAllTags() {
    const challenges = await loadAllChallenges();
    const tags = await loadAllTags();
    const usedTags: {amount: number, tag: Tag}[] = [];
    for (const tag of tags) {
        for (const challenge of challenges) {
            if (challenge.tags && containsTag(tag, challenge.tags)) {
                let found = false;
                for (const usedTag of usedTags) {
                    if (usedTag.tag.name === tag.name) {
                        usedTag.amount++;
                        found = true;
                    }
                }
                if (!found) {
                    usedTags.push({amount: 1, tag: tag});
                }
            }
        }
    }
    return usedTags;
}