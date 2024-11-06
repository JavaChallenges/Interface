import fs from "fs";
import { exec } from "child_process";

console.log("Startup...");

console.log("Cleaning up workspace and challenges folder...");
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
    exec('wget https://github.com/JavaChallenges/Challenges/archive/refs/heads/master.zip', (error, stdout, stderr) => {
        logExecOutput(error, stdout, stderr);
        if (!error) {
            exec('unzip master.zip', (error, stdout, stderr) => {
                logExecOutput(error, stdout, stderr);
                if (!error) {
                    exec('mv Challenges-master/challenges/ .', (error, stdout, stderr) => {
                        logExecOutput(error, stdout, stderr);
                        if (!error) {
                            exec('rm -r Challenges-master', (error, stdout, stderr) => {
                                logExecOutput(error, stdout, stderr);
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

function logExecOutput(error: Error | null, stdout: string, stderr: string) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error) {
        console.log('exec error: ' + error);
    }
}