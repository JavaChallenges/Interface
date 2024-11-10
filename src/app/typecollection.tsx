export type JSONValue =
    | string
    | number
    | boolean
    | null
    | JSONValue[]
    | {[key: string]: JSONValue}

export interface JSONObject {
    [k: string]: JSONValue
}

export type Template = {title:string, content: string, classname: string, whitelist: string[]}
export type ChallengeDetails = {name:string, friendlyName: string, difficulty: number, shortDescription:string, templates:Template[]}
export type SidebarInfo = SidebarEntry[]
export type SidebarEntry = {name: string, friendlyName: string, challenges?: ChallengeDetails[]}
export type CategoryDetails = {name: string, friendlyName: string, shortDescription: string, challenges: {shortDescription: string, name: string, friendlyName: string, difficulty: number}[]}