import fs from "fs";
import {loadCategories, loadMarkdown, loadTemplates, readJsonFile} from "@/app/backend/IO";
import {JSONObject} from "@/utils/typecollection";

jest.mock('fs', () => ({
    promises: {
        readFile: jest.fn(),
        readdir: jest.fn(),
    },
    readFileSync: jest.fn(),
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
    it('should load templates with non-.java content directly', () => {
        const mockTemplates = [
            { title: 'Template1', content: 'Some content', classname: 'Class1', whitelist: ['item1'] },
            { title: 'Template2', content: 'Another content', classname: 'Class2' }
        ];
        const mockPath = 'path/to';

        const result = loadTemplates((mockTemplates as JSONObject[]), mockPath);

        expect(result).toEqual([
            { title: 'Template1', content: 'Some content', classname: 'Class1', whitelist: ['item1'] },
            { title: 'Template2', content: 'Another content', classname: 'Class2', whitelist: [] }
        ]);
        expect(fs.readFileSync).not.toHaveBeenCalled();
    });

    /**
     * Test case for loading templates with .java content from file.
     */
    it('should load templates with .java content from file', () => {
        const mockTemplates = [
            { title: 'Template1', content: 'template1.java', classname: 'Class1', whitelist: ['item1'] },
            { title: 'Template2', content: 'template2.java', classname: 'Class2' }
        ];
        const mockPath = 'path/to';
        const mockFileContent = 'public class Template1 {}';

        (fs.readFileSync as jest.Mock).mockReturnValue(mockFileContent);

        const result = loadTemplates((mockTemplates as JSONObject[]), mockPath);

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