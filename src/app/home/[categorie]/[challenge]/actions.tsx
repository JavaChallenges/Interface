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

export async function validateCode(
    prevState: {
        errormessage?: string,
        statuscode: number,
        errorLines:  {[key: string]: number[]},
        testresults?: {name: string, failtype?: string, failmessage?: string}[],
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

    try {
        const challengepath = "./challenges/" + formData.get("challengepath");
        copyTestFiles(challengepath, path.join("./workspace/", uuid));
        await compile(uuid, classes );
        const {statuscode, tests} = await test(uuid);

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

function getErrorPositionsFromErrormessage(errormessage: string) {
    const errorLines:{[key: string]: number[]} = {};
    const regex = /([aA0-zZ9]+)\.java:\[(\d+),(\d+)]/gm

    const matches = [...errormessage.matchAll(regex)];

    if (matches) {
        const fileName = matches.map(m => m[1]);
        const lineNumber = matches.map(m => {return parseInt(m[2])-1});
        errorLines[fileName[0]] = [lineNumber[0]];
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

async function test(uuid: UUID): Promise<{statuscode: number, tests: {name: string, failtype?: string, failmessage?: string}[]}> {
    return new Promise((resolve, reject) => {
        exec(`mvn test -f ./workspace/${uuid}/pom.xml`, (error, stdout) => {
            const tests: {name:string, failtype?:string, failmessage?:string}[] = []
            let testamount = 0;
            let failed = 0;
            
            
            fs.readdirSync(`./workspace/${uuid}/target/surefire-reports`).forEach(file => {
               if(file.endsWith('.xml')) {
                   const xml = fs.readFileSync(`./workspace/${uuid}/target/surefire-reports/${file}`, 'utf8');
                   const json = JSON.parse(convert.xml2json(xml, {compact: false, spaces: 4}));
                   json.elements[0].elements.forEach((element: any) => {
                      if(element.name === "testcase") {
                          testamount++
                          if(element.elements){
                              tests.push({name: element.attributes.name, failtype: element.elements[0].attributes.type, failmessage: element.elements[0].attributes.message});
                                failed++;
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


async function compile(uuid: UUID, classes: {name: string, content: string}[]) {
    const folderPath = path.join("./workspace/", uuid + "/src/");
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    classes.map((jclass) => {
        const filePath = path.join(folderPath, jclass.name + '.java');
        fs.writeFileSync(filePath, jclass.content, 'utf8');
    });

    return new Promise((resolve, reject) => {
        exec(`mvn compile -f ./workspace/${uuid}/pom.xml`, (error, stdout, stderr) => {
            if (error) {
                /*
                    Clean up the default maven error message to only show the most relevant information to the user
                */

                let regex = /\[INFO] -*\s*\[ERROR] COMPILATION ERROR :\s*\[INFO] -*\s*\[ERROR] .*\s*\[INFO] .*\s*\[INFO] -*/mg
                stdout = stdout.match(regex)?.join("\n") ?? stdout;
                regex = /\/.*\/src\//mg
                stdout = stdout.replaceAll(regex, "");
                regex = /\[[A-Z]*] /mg
                stdout = stdout.replaceAll(regex, "");
                reject(`${stdout}`);
                return;
            }
            resolve(`stdout: ${stdout}\nstderr: ${stderr}`);
        });
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
