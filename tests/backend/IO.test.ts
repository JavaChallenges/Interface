import fs from "fs";
import {
    deleteFolderRecursive,
    loadAllTags,
    loadCategories,
    loadMarkdown,
    loadTemplates,
    readJsonFile
} from "@/app/backend/IO";
import {JSONObject} from "@/utils/typecollection";
import path from "node:path";

jest.mock('fs', () => ({
    promises: {
        readFile: jest.fn(),
        readdir: jest.fn(),
    },
    readFileSync: jest.fn(),
    existsSync: jest.fn(),
    readdirSync: jest.fn(),
    lstatSync: jest.fn(),
    unlinkSync: jest.fn(),
    rmdirSync: jest.fn(),
}));

describe('readJsonFile', () => {
    /**
     * Test case for successfully reading and parsing a JSON file.
     */
    it('should return parsed JSON object when file is read successfully', async () => {
        const mockData = JSON.stringify({ key: 'value' });
        (fs.promises.readFile as jest.Mock).mockResolvedValue(mockData);

        const result = await readJsonFile('path/to/file.json');
        expect(result).toEqual({ key: 'value' });
    });

    /**
     * Test case for handling errors when reading a JSON file.
     */
    it('should return null and log error when file reading fails', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        (fs.promises.readFile as jest.Mock).mockRejectedValue(new Error('File read error'));

        const result = await readJsonFile('path/to/file.json');
        expect(result).toBeNull();
        expect(consoleSpy).toHaveBeenCalledWith('Error reading JSON file:', 'path/to/file.json');

        consoleSpy.mockRestore();
    });
});

describe('loadMarkdown', () => {
    /**
     * Test case for successfully reading a markdown file.
     */
    it('should return file content when file is read successfully', async () => {
        const mockData = 'Markdown content';
        (fs.promises.readFile as jest.Mock).mockResolvedValue(mockData);

        const result = await loadMarkdown('path/to/file.md');
        expect(result).toBe(mockData);
    });

    /**
     * Test case for handling errors when reading a markdown file.
     */
    it('should return null and log error when file reading fails', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        (fs.promises.readFile as jest.Mock).mockRejectedValue(new Error('File read error'));

        const result = await loadMarkdown('path/to/file.md');
        expect(result).toBeNull();
        expect(consoleSpy).toHaveBeenCalledWith('Error reading markdown file: ', 'path/to/file.md');

        consoleSpy.mockRestore();
    });
});

describe('loadTemplates', () => {
    /**
     * Test case for loading templates with non-.java content directly.
     */
    it('should load templates with non-.java content directly', async () => {
        const mockTemplates = [
            { title: 'Template1', content: 'Some content', classname: 'Class1', whitelist: ['item1'] },
            { title: 'Template2', content: 'Another content', classname: 'Class2' }
        ];
        const mockPath = 'path/to';

        const result = await loadTemplates((mockTemplates as JSONObject[]), mockPath);

        expect(result).toEqual([
            { title: 'Template1', content: 'Some content', classname: 'Class1', whitelist: ['item1'] },
            { title: 'Template2', content: 'Another content', classname: 'Class2', whitelist: [] }
        ]);
        expect(fs.readFileSync).not.toHaveBeenCalled();
    });

    /**
     * Test case for loading templates with .java content from file.
     */
    it('should load templates with .java content from file', async () => {
        const mockTemplates = [
            { title: 'Template1', content: 'template1.java', classname: 'Class1', whitelist: ['item1'] },
            { title: 'Template2', content: 'template2.java', classname: 'Class2' }
        ];
        const mockPath = 'path/to';
        const mockFileContent = 'public class Template1 {}';

        (fs.readFileSync as jest.Mock).mockReturnValue(mockFileContent);

        const result = await loadTemplates((mockTemplates as JSONObject[]), mockPath);

        expect(result).toEqual([
            { title: 'Template1', content: mockFileContent, classname: 'Class1', whitelist: ['item1'] },
            { title: 'Template2', content: mockFileContent, classname: 'Class2', whitelist: [] }
        ]);
        expect(fs.readFileSync).toHaveBeenCalledWith('path/to/templates/template1.java', 'utf-8');
        expect(fs.readFileSync).toHaveBeenCalledWith('path/to/templates/template2.java', 'utf-8');
    });
});

describe('loadCategories', () => {
    /**
     * Test case for successfully loading category names from directories.
     */
    it('should return an array of folder names when directories are present', async () => {
        const mockFiles = [
            { name: 'category1', isDirectory: () => true },
            { name: 'category2', isDirectory: () => true },
            { name: 'file1.txt', isDirectory: () => false }
        ];

        (fs.promises.readdir as jest.Mock).mockResolvedValue(mockFiles);

        const result = await loadCategories();
        expect(result).toEqual(['category1', 'category2']);
    });

    /**
     * Test case for handling no directories present.
     */
    it('should return an empty array when no directories are present', async () => {
        const mockFiles = [
            { name: 'file1.txt', isDirectory: () => false },
            { name: 'file2.txt', isDirectory: () => false }
        ];

        (fs.promises.readdir as jest.Mock).mockResolvedValue(mockFiles);

        const result = await loadCategories();
        expect(result).toEqual([]);
    });

    /**
     * Test case for handling errors when reading directories.
     */
    it('should return an empty array and log error when readdir fails', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        (fs.promises.readdir as jest.Mock).mockRejectedValue(new Error('Read error'));

        const result = await loadCategories();
        expect(result).toEqual([]);
        expect(consoleSpy).toHaveBeenCalledWith('Error reading categories:', expect.any(Error));

        consoleSpy.mockRestore();
    });
});

/**
 * Test suite for the `loadAllTags` function.
 */
describe('loadAllTags', () => {
    /**
     * Test case for successfully reading and parsing the tags JSON file.
     * It should return an array of Tag objects when the file is read successfully.
     */
    it('should return an array of Tag objects when file is read successfully', async () => {
        const mockData = JSON.stringify({
            tag1: { color1: 'red' },
            tag2: { color2: 'blue' }
        });
        (fs.promises.readFile as jest.Mock).mockResolvedValue(mockData);

        const result = await loadAllTags();
        expect(result).toEqual([
            { name: 'color1', color: 'red' },
            { name: 'color2', color: 'blue' }
        ]);
    });

    /**
     * Test case for handling an empty JSON file.
     * It should return an empty array when the JSON file is empty.
     */
    it('should return an empty array when the JSON file is empty', async () => {
        const mockData = JSON.stringify({});
        (fs.promises.readFile as jest.Mock).mockResolvedValue(mockData);

        const result = await loadAllTags();
        expect(result).toEqual([]);
    });

    /**
     * Test case for handling file reading errors.
     * It should throw an error when file reading fails.
     */
    it('should throw an error when file reading fails', async () => {
        (fs.promises.readFile as jest.Mock).mockRejectedValue(new Error('File read error'));

        await expect(loadAllTags()).rejects.toThrow('File read error');
    });
});

/**
 * Test suite for the `deleteFolderRecursive` function.
 */
describe("deleteFolderRecursive", () => {

    /**
     * Test case for deleting all files and directories recursively.
     * It mocks the file system to simulate the presence of files and directories,
     * and verifies that the function deletes them as expected.
     */
    it("should delete all files and directories recursively", async () => {
        (fs.existsSync as jest.Mock).mockReturnValue(true);
        (fs.readdirSync as jest.Mock).mockReturnValue(["file1.txt", "dir1"]);
        (fs.lstatSync as jest.Mock).mockImplementation((filePath) => ({
            isDirectory: () => filePath === path.join("testDir", "dir1"),
        }));

        await deleteFolderRecursive("testDir");

        expect(fs.unlinkSync).toHaveBeenCalledWith(path.join("testDir", "file1.txt"));
        expect(fs.rmdirSync).toHaveBeenCalledWith(path.join("testDir", "dir1"));
        expect(fs.rmdirSync).toHaveBeenCalledWith("testDir");
    });

    /**
     * Test case for handling an empty directory.
     * It mocks the file system to simulate an empty directory,
     * and verifies that the function deletes the directory as expected.
     */
    it("should handle empty directory", async () => {
        (fs.existsSync as jest.Mock).mockReturnValue(true);
        (fs.readdirSync as jest.Mock).mockReturnValue([]);

        await deleteFolderRecursive("emptyDir");

        expect(fs.rmdirSync).toHaveBeenCalledWith("emptyDir");
    });

    /**
     * Test case for handling nested directories.
     * It mocks the file system to simulate nested directories,
     * and verifies that the function deletes them recursively as expected.
     */
    it("should handle nested directories", async () => {
        (fs.existsSync as jest.Mock).mockReturnValue(true);
        (fs.readdirSync as jest.Mock).mockImplementation((dirPath) => {
            if (dirPath === "testDir") return ["dir1"];
            if (dirPath === path.join("testDir", "dir1")) return ["file1.txt"];
            return [];
        });
        (fs.lstatSync as jest.Mock).mockImplementation((filePath) => ({
            isDirectory: () => filePath === path.join("testDir", "dir1"),
        }));

        await deleteFolderRecursive("testDir");

        expect(fs.unlinkSync).toHaveBeenCalledWith(path.join("testDir", "dir1", "file1.txt"));
        expect(fs.rmdirSync).toHaveBeenCalledWith(path.join("testDir", "dir1"));
        expect(fs.rmdirSync).toHaveBeenCalledWith("testDir");
    });
});