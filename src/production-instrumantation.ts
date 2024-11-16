import fs from "fs";
import {exec} from "child_process";

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

function createFolderIfNotExists(path: string) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
}

function deleteFileIfExists(path: string) {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
}

function downloadAndExtractChallenges() {
    console.log("Downloading challenges...");
    let url
    if(process.env.INDEV) {
        console.log("Indev variante wird geladen");
        url = "https://github.com/JavaChallenges/Challenges/archive/refs/heads/development.zip"
    } else {
        url = "https://github.com/JavaChallenges/Challenges/archive/refs/heads/master.zip"
        // Delete playground folder as it should not be in production
        deleteFolderRecursive("./challenges/0_playground");
    }
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
                            });
                        }
                    });
                }
            });
        }
    });
}

function deleteFolderRecursive(path: string) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach((file) => {
            const curPath = `${path}/${file}`;
            if (fs.lstatSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}