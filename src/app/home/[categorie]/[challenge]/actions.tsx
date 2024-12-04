"use server";

/*
Statuscodes:
0 = Success
1 = Error
2 = Attention
3 = Failure
4 = Internal Error
*/

import {revalidatePath} from "next/cache";
import {randomUUID} from "node:crypto";
import {exec} from "node:child_process";
import {TestResult} from "@/utils/typecollection";
import {deleteFolderRecursive} from "@/app/backend/IO";
import {filterErrorMessages, getErrorPositionsFromErrormessage} from "@/app/backend/compileCleanup";
import {copyTestFiles, parseTestResult, writeSourceFiles} from "@/app/backend/compileIO";

//TODO Test

/**
 * Validates the provided code by compiling and running tests.
 *
 * @param {Object} prevState - The previous state of the validation.
 * @param {number} prevState.statuscode - The previous status code.
 * @param {Object.<string, number[]>} prevState.errorLines - The previous error lines.
 * @param {string} [prevState.errormessage] - The previous error message.
 * @param {TestResult[]} [prevState.testResults] - The previous test results.
 * @param {FormData} formData - The form data containing the code and whitelist.
 * @returns {Promise<Object>} - The result of the validation.
 * @returns {number} result.statuscode - The status code of the validation.
 * @returns {Object.<string, number[]>} result.errorLines - The error lines of the validation.
 * @returns {string} [result.errormessage] - The error message of the validation.
 * @returns {Object[]} [result.testResults] - The test results of the validation.
 */
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
        await deleteFolderRecursive(`./workspace/${uuid}`);
        if(e as string === "No test results found"){
            return { errormessage: "No test results found", statuscode: 4, errorLines: {} };
        }
        const errorLines = getErrorPositionsFromErrormessage(e as string);
        return { errormessage: e as string, statuscode: 1, errorLines };
    }
}

/**
 * Reads the form data and extracts the code and error lines.
 *
 * @param {FormData} formData - The form data containing the code and whitelist.
 * @param {Object.<string, number[]>} errorLines - The error lines to populate.
 * @param {Object[]} classes - The classes to populate.
 * @param {string} classes[].name - The name of the class.
 * @param {string} classes[].content - The content of the class.
 */
function readFormData(formData: FormData, errorLines: { [key: string]: number[] }, classes: { name: string, content: string }[]) {
    formData.forEach((value, key) => {
        if (key.startsWith("code-")) {
            const classname = key.substring(5);
            errorLines[classname] = [];
            classes.push({ name: classname, content: (value as string).replaceAll("/l/", "\n") });
        }
    });
}

/**
 * Compiles and tests the provided code.
 *
 * @param {Object.<string, string[]>} whitelist - The whitelist of allowed imports.
 * @param {string} uuid - The unique identifier for the workspace.
 * @param {Object[]} classes - The classes to compile and test.
 * @param {string} classes[].name - The name of the class.
 * @param {string} classes[].content - The content of the class.
 * @returns {Promise<Object>} - The result of the compilation and testing.
 * @returns {number} result.statuscode - The status code of the compilation and testing.
 * @returns {TestResult[]} result.tests - The test results of the compilation and testing.
 */
async function compileAndTest(whitelist: { [key: string]: string[] }, uuid: string, classes: { name: string, content: string }[]): Promise<{ statuscode: number, tests: TestResult[] }> {
    await writeSourceFiles(whitelist, uuid, classes);
    return new Promise((resolve, reject) => {
        exec(`mvn test -f ./workspace/${uuid}/pom.xml`, (error, stdout) => {

            if (error && stdout.includes("COMPILATION ERROR")) {
                reject(filterErrorMessages(stdout));
                return;
            }

            const result = parseTestResult(uuid);
            if(result === null){
                reject("No test results found");
                return;
            }

            const tests: TestResult[] = result.result;
            const [testamount, failed] = [result.testamount, result.failed];

            const statuscode = failed === testamount ? 3 : failed > 0 ? 2 : 0;
            resolve({ statuscode, tests });
        });
    });
}