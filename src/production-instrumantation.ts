import fs from "fs";
import {exec} from "child_process";
import path from "node:path";
import {getVersion} from "@/utils/helpers";

let version;
try {
    version = fs.readFileSync('./VERSION', 'utf8').trim().replace("\n", "");
} catch {
    version = "Lokale Entwicklungsversion"
}

console.log("=====================================")
console.log("Starte Challenge Interface")
console.log("Version: " + version)
console.log("=====================================")

console.log("Challenge und Workspace Ordner aufräumen...");
deleteFolderRecursive("./workspace/");
deleteFolderRecursive("./challenges/");
createFolderIfNotExists("./workspace/");
downloadAndExtractChallenges();

/**
 * Creates a folder if it does not already exist.
 *
 * @param {string} path - The path of the folder to create.
 */
export function createFolderIfNotExists(path: string) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
}

/**
 * Deletes a file if it exists.
 *
 * @param {string} path - The path of the file to delete.
 */
export function deleteFileIfExists(path: string) {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
}

/**
 * Downloads and extracts challenges from a GitHub repository.
 *
 * This function fetches the latest version of the challenges, downloads the zip file,
 * extracts it, and moves the challenges to the appropriate directory.
 */
export function downloadAndExtractChallenges() {
    console.log("Downloading challenges...");
    if(process.env.INDEV) {
        console.log("Indev variante wird geladen");
    }
    getVersion(process.env.INDEV !== undefined).then((version) => {
        const url = `https://github.com/JavaChallenges/Challenges/archive/refs/tags/${version}.zip`
        exec(`wget -O master.zip ${url}`, (error) => {
            if (!error) {
                exec('unzip master.zip', (error) => {
                    if (!error) {
                        exec('mv Challenges-*/challenges/ .', (error) => {
                            if (!error) {
                                exec('rm -r Challenges-*', (error) => {
                                    if (!error) {
                                        deleteFileIfExists("master.zip");
                                    }
                                    if (!process.env.INDEV) {
                                        deleteFolderRecursive("./challenges/0_playground");
                                    }
                                    fs.writeFileSync("./challenges/VERSION", version, 'utf8');
                                });
                            }
                        });
                    }
                });
            }
        });
    })
}

/**
 * Recursively deletes a folder and its contents.
 *
 * @param {string} folderPath - The path of the folder to delete.
 */
export function deleteFolderRecursive(folderPath: string) {
    if (fs.existsSync(folderPath)) {
        fs.readdirSync(folderPath).forEach((file) => {
            const currentPath = path.join(folderPath, file);
            if (fs.lstatSync(currentPath).isDirectory()) {
                // Recursively delete subdirectory
                deleteFolderRecursive(currentPath);
            } else {
                // Delete file
                fs.unlinkSync(currentPath);
            }
        });
        fs.rmdirSync(folderPath);
    }
}