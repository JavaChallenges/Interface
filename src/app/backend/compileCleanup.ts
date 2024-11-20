import {readJsonFile} from "@/app/backend/IO";

export function checkWhitelist(content: string, whitelist: string[]): string {
    const regex = /import .*;/gm;
    const matches = content.match(regex);
    if (matches) {
        matches.forEach(match => {
            if (!whitelist.some(item => match.includes(item))) {
                content = content.replace(match, "");
            }
        });
    }
    return content;
}

export async function checkBlacklist(content: string): Promise<string> {
    const blacklistJson = await readJsonFile("importBlacklist.json");
    if(blacklistJson){
        const blacklist: string[] = blacklistJson.blacklist as string[];
        if(blacklist){
            blacklist.forEach((blockedImport: string) => {
                const regex = new RegExp(`import ${blockedImport}.*;`, "gm");
                content = content.replace(regex, "");
            });
            return content;
        } else {
            return content;
        }
    } else {
        return content;
    }
}

export function filterErrorMessages(errormessage: string): string {
    let regex = /\[INFO] -*\s*\[ERROR] COMPILATION ERROR :\s*\[INFO] -*\s*\[ERROR] [\S\s]*\[INFO] \d errors?\s*\[INFO] -*/gm;
    errormessage = errormessage.match(regex)?.join("\n") ?? errormessage;
    regex = /\/.*\/src\//mg
    errormessage = errormessage.replaceAll(regex, "");
    regex = /\[[A-Z]*] /mg
    errormessage = errormessage.replaceAll(regex, "");
    regex = /.*[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\/tests\/.*\.java:\[\d*,\d*]/gm
    errormessage = errormessage.replaceAll(regex, "");
    return errormessage
}


export function getErrorPositionsFromErrormessage(errormessage: string) {
    const errorLines: { [key: string]: number[] } = {};
    const regex = /([a-zA-Z0-9]+)\.java:\[(\d+),(\d+)]/gm;
    const matches = [...errormessage.matchAll(regex)];

    matches.forEach(match => {
        const [fileName, lineNumber] = [match[1], parseInt(match[2]) - 1];
        if (errorLines[fileName]) {
            errorLines[fileName].push(lineNumber);
        } else {
            errorLines[fileName] = [lineNumber];
        }
    });
    return errorLines;
}