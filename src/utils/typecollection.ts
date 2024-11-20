/**
 * Represents a JSON value which can be a string, number, boolean, null, array of JSON values, or an object with string keys and JSON values.
 */
export type JSONValue =
    | string
    | number
    | boolean
    | null
    | JSONValue[]
    | { [key: string]: JSONValue }

/**
 * Represents a JSON object with string keys and JSON values.
 */
export interface JSONObject {
    [k: string]: JSONValue
}

/**
 * Represents the result of a test.
 * @property {string} name - The name of the test.
 * @property {string} [failtype] - The type of failure, if any.
 * @property {string} [failmessage] - The failure message, if any.
 * @property {string} [systemout] - The system output, if any.
 * @property {string} [failError] - The failure error, if any.
 */
export type TestResult = { name: string, failtype?: string, failmessage?: string, systemout?: string, failError?: string }

/**
 * Represents a template.
 * @property {string} title - The title of the template.
 * @property {string} content - The content of the template.
 * @property {string} classname - The class name associated with the template.
 * @property {string[]} whitelist - The whitelist of items for the template.
 */
export type Template = { title: string, content: string, classname: string, whitelist: string[] }

/**
 * Represents a tag.
 * @property {string} name - The name of the tag.
 * @property {string} color - The color of the tag.
 */
export type Tag = { name: string, color: string }

/**
 * Represents the details of a challenge.
 * @property {string} name - The name of the challenge.
 * @property {string} categoryRef - The reference to the category of the challenge.
 * @property {string} friendlyName - The friendly name of the challenge.
 * @property {number} difficulty - The difficulty level of the challenge.
 * @property {string} shortDescription - The short description of the challenge.
 * @property {Template[]} templates - The templates associated with the challenge.
 * @property {Tag[]} [tags] - The tags associated with the challenge.
 */
export type ChallengeDetails = { name: string, categoryRef: string, friendlyName: string, difficulty: number, shortDescription: string, templates: Template[], tags?: Tag[] }

/**
 * Represents the sidebar information which is an array of sidebar entries.
 */
export type SidebarInfo = SidebarEntry[]

/**
 * Represents a sidebar entry.
 * @property {string} name - The name of the sidebar entry.
 * @property {string} friendlyName - The friendly name of the sidebar entry.
 * @property {ChallengeDetails[]} [challenges] - The challenges associated with the sidebar entry.
 */
export type SidebarEntry = { name: string, friendlyName: string, challenges?: ChallengeDetails[] }

/**
 * Represents the details of a category.
 * @property {string} name - The name of the category.
 * @property {string} friendlyName - The friendly name of the category.
 * @property {string} shortDescription - The short description of the category.
 * @property {ChallengeDetails[]} challenges - The challenges associated with the category.
 */
export type CategoryDetails = { name: string, friendlyName: string, shortDescription: string, challenges: ChallengeDetails[] }

/**
 * Represents a contributor.
 * @property {string} name - The name of the contributor.
 * @property {string} type - The type of the contributor.
 * @property {number} contributions - The number of contributions made by the contributor.
 * @property {string} avatar_url - The URL of the contributor's avatar.
 * @property {string} url - The URL of the contributor's profile.
 */
export type Contribrutor = { name: string, type: string, contributions: number, avatar_url: string, url: string }