"use server";

/*
Statuscodes:
0 = Success
1 = Error
2 = Attention
3 = Failure
 */

import {revalidatePath} from "next/cache";
import {randomUUID, UUID} from "node:crypto";
import path from "node:path";
import fs from "fs";
import {exec} from "node:child_process";
import convert from "xml-js";
import {TestResult} from "@/utils/typecollection";

export async function validateCode(
    prevState: {
        errormessage?: string,
        statuscode: number,
        errorLines:  {[key: string]: number[]},
        testresults?: TestResult[],
    },
    formData: FormData,
):Promise<{
        errormessage?: string,
        statuscode: number,
        errorLines:  {[key: string]: number[]},
        testresults?: {name: string, failtype?: string, failmessage?: string}[],
}>{
    const uuid = randomUUID();

    const classes:{name: string, content: string}[] = [];
    const errorLines:{[key: string]: number[]} = {};
    readFormData(formData, errorLines, classes);

    const whitelist = JSON.parse(formData.get("whitelist") as string);

    try {
        const challengepath = "./challenges/" + formData.get("challengepath");
        copyTestFiles(challengepath, path.join("./workspace/", uuid));
        const {statuscode, tests} = await compileAndTest(whitelist, uuid, classes);

        revalidatePath("/[categorie]/[challenge]");
        await deleteFolderRecursive(path.join("./workspace/", uuid));
        return { testresults: tests, statuscode: statuscode, errorLines };
    } catch (e) {
        const errorLines = getErrorPositionsFromErrormessage(e as string);
        await deleteFolderRecursive(path.join("./workspace/", uuid));
        return { errormessage: e as string , statuscode: 1, errorLines };
    }
}

function readFormData(formData: FormData, errorLines: {[key: string]: number[]}, classes: {name: string, content: string}[]) {
    formData.forEach((value, key) => {
        if(key.startsWith("code-")) {
            const classname = key.substring(5);
            errorLines[classname] = [];
            classes.push({name: classname, content: (value as string).replaceAll("/l/", "\n")});
        }
    });
}


function checkWhitelist(content: string, whitelist: string[]): string {
    /*
    Remove all imports from the code to prevent the user from using any undesired libraries
    */
    const regex = /import .*;/gm;
    const matches = content.match(regex);
    if(matches) {
        for (const match of matches) {
            for (const whitelistitem of whitelist) {
                if(!match.includes(whitelistitem)) {
                    content = content.replace(match, "");
                }
            }
        }
    }
    return content
}

function checkBlacklist(content: string): string {
    const data = fs.readFileSync("importBlacklist.json", "utf8");
    const blacklist = JSON.parse(data);
    const blockedImports = blacklist["blacklist"] as string[];
    for (const blockedImport of blockedImports) {
        const regex = new RegExp(`import ${blockedImport}.*;`, "gm");
        content = content.replace(regex, "");
    }

    return content;
}


function getErrorPositionsFromErrormessage(errormessage: string) {
    const errorLines:{[key: string]: number[]} = {};
    const regex = /([aA0-zZ9]+)\.java:\[(\d+),(\d+)]/gm

    const matches = [...errormessage.matchAll(regex)];

    if (matches) {
        for (const index in matches) {
            const match = matches[index];
            const fileName = match[1];
            const lineNumber = parseInt(match[2])-1;
            if(errorLines[fileName]) {
                errorLines[fileName].push(lineNumber);
            } else {
                errorLines[fileName] = [lineNumber];
            }
        }
    }
    return errorLines;
}

async function deleteFolderRecursive(path: string) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach((file) => {
            const curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

async function compileAndTest(whitelist:{[key: string]: string[]}, uuid: UUID, classes: {name: string, content: string}[]): Promise<{statuscode: number, tests: TestResult[]}> {
    writeSourceFiles(whitelist, uuid, classes);
    return new Promise((resolve, reject) => {
        exec(`mvn test -f ./workspace/${uuid}/pom.xml`, (error, stdout) => {
            const tests: TestResult[] = []
            let testamount = 0;
            let failed = 0;

            if (error && stdout.includes("COMPILATION ERROR")) {
                reject(`${filterErrorMessages(stdout)}`);
                return;
            }

            fs.readdirSync(`./workspace/${uuid}/target/surefire-reports`).forEach(file => {
               if(file.endsWith('.xml')) {
                   const xml = fs.readFileSync(`./workspace/${uuid}/target/surefire-reports/${file}`, 'utf8');
                   const json = JSON.parse(convert.xml2json(xml, {compact: false, spaces: 4}));
                   json.elements[0].elements.forEach((
                       element: {
                           name: string;
                           attributes: {
                               name: string;
                           };
                           elements?: {
                               name: string;
                               attributes: {
                                   type: string;
                                   message: string;
                               };
                               elements: {
                                   cdata: string;
                               }[];
                           }[];
                       }
                   ) => {
                       if(element.name === "testcase") {
                           testamount++
                           if(element.elements){
                               if(element.elements[0].name === "failure"){
                                   failed++;
                                   if(element.elements[1] && element.elements[1].name === "system-out") {
                                       tests.push({
                                           name: element.attributes.name,
                                           failtype: element.elements[0].attributes.type,
                                           failmessage: element.elements[0].attributes.message,
                                           failError: element.elements[0].elements[0].cdata,
                                           systemout: element.elements[1].elements[0].cdata
                                       });
                                   } else {
                                       tests.push({
                                           name: element.attributes.name,
                                           failtype: element.elements[0].attributes.type,
                                           failmessage: element.elements[0].attributes.message,
                                           failError: element.elements[0].elements[0].cdata,
                                       });
                                   }
                               } else if(element.elements[0].name === "system-out"){
                                   tests.push({name: element.attributes.name, systemout: element.elements[0].elements[0].cdata});
                               }
                           } else {
                               tests.push({name: element.attributes.name});
                           }
                       }
                   });
               }
            });

            let statuscode = 0;
            if(failed > 0) {
                statuscode = 2;
            }
            if(failed === testamount) {
                statuscode = 3;
            }
            resolve({statuscode, tests});
        });
    });
}

function filterErrorMessages(errormessage: string):string {
    /*
        Clean up the default maven error message to only show the most relevant information to the user
    */
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

function writeSourceFiles(whitelist: {[key: string]: string[]}, uuid: string, classes: {name: string, content: string}[]) {
    const folderPath = path.join("./workspace/", uuid + "/src/");
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    classes.map((jclass) => {
        const filePath = path.join(folderPath, jclass.name + '.java');
        let content = checkWhitelist(jclass.content, whitelist[jclass.name]);
        content = checkBlacklist(content);
        fs.writeFileSync(filePath, content, 'utf8');
    });
}

function copyTestFiles(srcDir: string, destDir: string) {
    const testDir = path.join(destDir, 'tests');
    if (!fs.existsSync(testDir)) {
        fs.mkdirSync(testDir, { recursive: true });
    }
    fs.copyFileSync("./challenges/pom.xml", destDir + "/pom.xml");

    const files = fs.readdirSync(srcDir);

    files.forEach(file => {
        if (file.endsWith('.java')) {
            const srcFile = path.join(srcDir, file);
            const destFile = path.join(testDir, file);
            fs.copyFileSync(srcFile, destFile);
        }
    });
}
