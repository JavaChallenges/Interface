import path from "node:path";
import fs from "fs";
import {checkBlacklist, checkWhitelist} from "@/app/backend/compileCleanup";
import {TestResult} from "@/utils/typecollection";
import convert from "xml-js";

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

export function parseTestresult(uuid: string): { result: TestResult[], testamount: number, failed: number } {
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
}