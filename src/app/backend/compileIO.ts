import path from "node:path";
import fs from "fs";
import {checkBlacklist, checkWhitelist} from "@/app/backend/compileCleanup";
import {TestResult} from "@/utils/typecollection";
import convert from "xml-js";

/**
 * Writes source files to the specified directory.
 *
 * @param whitelist - An object containing whitelisted content for each class.
 * @param uuid - A unique identifier for the workspace.
 * @param classes - An array of objects containing class names and their content.
 * @returns A promise that resolves when the files are written.
 */
export async function writeSourceFiles(whitelist: { [key: string]: string[] }, uuid: string, classes: { name: string, content: string }[]): Promise<void> {
    const folderPath = path.join("./workspace/", `${uuid}/src/`);
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    for (const jclass of classes) {
        const filePath = path.join(folderPath, `${jclass.name}.java`);
        let content = checkWhitelist(jclass.content, whitelist[jclass.name]);
        content = await checkBlacklist(content);
        fs.writeFileSync(filePath, content, 'utf8');
    }
}

/**
 * Copies test files from the source directory to the destination directory.
 *
 * @param srcDir - The source directory containing the test files.
 * @param destDir - The destination directory where the test files will be copied.
 */
export function copyTestFiles(srcDir: string, destDir: string) {
    const testDir = path.join(destDir, 'tests');
    if (!fs.existsSync(testDir)) {
        fs.mkdirSync(testDir, { recursive: true });
    }
    fs.copyFileSync("./challenges/pom.xml", path.join(destDir, "pom.xml"));

    fs.readdirSync(srcDir).forEach(file => {
        if (file.endsWith('.java')) {
            fs.copyFileSync(path.join(srcDir, file), path.join(testDir, file));
        }
    });
}

/**
 * Parses the test results from the surefire reports.
 *
 * @param uuid - A unique identifier for the workspace.
 * @returns An object containing the test results, the total number of tests, and the number of failed tests.
 */
export function parseTestResult(uuid: string): { result: TestResult[], testamount: number, failed: number }|null {
    try {
        const tests: TestResult[] = [];
        const testFiles = fs.readdirSync(`./workspace/${uuid}/target/surefire-reports`);
        let testamount = 0, failed = 0;

        testFiles.forEach(file => {
            if (file.endsWith('.xml')) {
                const xml = fs.readFileSync(`./workspace/${uuid}/target/surefire-reports/${file}`, 'utf8');
                const json = JSON.parse(convert.xml2json(xml, { compact: false, spaces: 4 }));
                json.elements[0].elements.forEach((element: {
                    name: string;
                    attributes: { name: string };
                    elements?: {
                        name: string;
                        attributes: { type: string; message: string };
                        elements: { cdata: string }[];
                    }[];
                }) => {
                    if (element.name === "testcase") {
                        testamount++;
                        if (element.elements) {
                            const failure = element.elements.find(e => e.name === "failure");
                            const error = element.elements.find(e => e.name === "error");
                            const systemOut = element.elements.find(e => e.name === "system-out");

                            if (failure) {
                                failed++;
                                tests.push({
                                    name: element.attributes.name,
                                    failtype: failure.attributes.type,
                                    failmessage: failure.attributes.message,
                                    failError: failure.elements[0].cdata,
                                    systemout: systemOut ? systemOut.elements[0].cdata : undefined
                                });
                            } else if (error) {
                                failed++;
                                tests.push({
                                    name: element.attributes.name,
                                    failtype: error.attributes.type,
                                    failmessage: "Error occurred during execution",
                                    failError: error.elements[0].cdata
                                });
                            } else if (systemOut) {
                                tests.push({
                                    name: element.attributes.name,
                                    systemout: systemOut.elements[0].cdata
                                });
                            } else {
                                tests.push({ name: element.attributes.name });
                            }
                        } else {
                            tests.push({ name: element.attributes.name });
                        }
                    }
                });
            }
        });
        return { result: tests, testamount, failed };
    }catch (e){
        console.error(e);
        return null;
    }
}