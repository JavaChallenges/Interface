"use server";

/*
Statuscodes:
0 = Success
1 = Error
2 = Attention
3 = Failure
*/

import { revalidatePath } from "next/cache";
import { randomUUID } from "node:crypto";
import { exec } from "node:child_process";
import { TestResult } from "@/utils/typecollection";
import {deleteFolderRecursive} from "@/app/backend/IO";
import {filterErrorMessages, getErrorPositionsFromErrormessage} from "@/app/backend/compileCleanup";
import {copyTestFiles, parseTestresult, writeSourceFiles} from "@/app/backend/compileIO";

export async function validateCode(
    prevState: {
        errormessage?: string,
        statuscode: number,
        errorLines: { [key: string]: number[] },
        testresults?: TestResult[],
    },
    formData: FormData,
): Promise<{
    errormessage?: string,
    statuscode: number,
    errorLines: { [key: string]: number[] },
    testresults?: { name: string, failtype?: string, failmessage?: string }[],
}> {
    const uuid = randomUUID();
    const classes: { name: string, content: string }[] = [];
    const errorLines: { [key: string]: number[] } = {};
    readFormData(formData, errorLines, classes);

    const whitelist = JSON.parse(formData.get("whitelist") as string);

    try {
        const challengepath = `./challenges/${formData.get("challengepath")}`;
        copyTestFiles(challengepath, `./workspace/${uuid}`);
        const { statuscode, tests } = await compileAndTest(whitelist, uuid, classes);

        revalidatePath("/[categorie]/[challenge]");
        await deleteFolderRecursive(`./workspace/${uuid}`);
        return { testresults: tests, statuscode, errorLines };
    } catch (e) {
        const errorLines = getErrorPositionsFromErrormessage(e as string);
        await deleteFolderRecursive(`./workspace/${uuid}`);
        return { errormessage: e as string, statuscode: 1, errorLines };
    }
}

function readFormData(formData: FormData, errorLines: { [key: string]: number[] }, classes: { name: string, content: string }[]) {
    formData.forEach((value, key) => {
        if (key.startsWith("code-")) {
            const classname = key.substring(5);
            errorLines[classname] = [];
            classes.push({ name: classname, content: (value as string).replaceAll("/l/", "\n") });
        }
    });
}


async function compileAndTest(whitelist: { [key: string]: string[] }, uuid: string, classes: { name: string, content: string }[]): Promise<{ statuscode: number, tests: TestResult[] }> {
    await writeSourceFiles(whitelist, uuid, classes);
    return new Promise((resolve, reject) => {
        exec(`mvn test -f ./workspace/${uuid}/pom.xml`, (error, stdout) => {

            if (error && stdout.includes("COMPILATION ERROR")) {
                reject(filterErrorMessages(stdout));
                return;
            }

            const result = parseTestresult(uuid);
            const tests: TestResult[] = result.result;
            const [testamount, failed] = [result.testamount, result.failed];


            const statuscode = failed === testamount ? 3 : failed > 0 ? 2 : 0;
            resolve({ statuscode, tests });
        });
    });
}