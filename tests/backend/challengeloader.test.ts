import { matchColorToTagName } from '@/app/home/tags/[tag]/actions';
import * as actions from '@/app/home/challengeloader';
import {loadAllChallengesOfCategory, loadCategories, loadTemplates, readJsonFile} from "@/app/backend/IO";
import {loadAllChallenges, loadCategoryDetails, loadSidebarInformation} from "@/app/home/challengeloader";

jest.mock('@/app/home/tags/[tag]/actions', () => ({
    matchColorToTagName: jest.fn()
}));

jest.mock('@/app/backend/IO', () => ({
    readJsonFile: jest.fn(),
    loadTemplates: jest.fn(),
    loadCategories: jest.fn(),
    loadAllChallengesOfCategory: jest.fn()
}));

describe('loadChallengeDetails', () => {
    const category = 'category1';
    const challenge = 'challenge1';
    const templates= [
        { title: 'Template1', content: 'public class Template1Class {}', classname: 'Template1Class', whitelist: [] }
    ]
    const challengeConfigJSON = {
        friendlyName: 'Friendly Challenge',
        difficulty: '3',
        shortDescription: 'A short description',
        tags: ['tag1', 'tag2'],
        templates: [
            { title: 'Template1', content: 'template1.java', classname: 'Template1Class' }
        ]
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should load challenge details successfully', async () => {
        (loadTemplates as jest.Mock).mockReturnValue(templates);
        (readJsonFile as jest.Mock).mockResolvedValue(challengeConfigJSON);
        (matchColorToTagName as jest.Mock).mockResolvedValue('red');

        const result = await actions.loadChallengeDetails(category, challenge);

        expect(result).toEqual({
            name: challenge,
            friendlyName: 'Friendly Challenge',
            difficulty: 3,
            shortDescription: 'A short description',
            templates: [{
                title: 'Template1',
                content: 'public class Template1Class {}',
                classname: 'Template1Class',
                whitelist: []
            }],
            tags: [
                { name: 'tag1', color: 'red' },
                { name: 'tag2', color: 'red' }
            ],
            categoryRef: category
        });
    });

    it('should return null if challenge config is not found', async () => {
        (readJsonFile as jest.Mock).mockResolvedValue(null);

        const result = await actions.loadChallengeDetails(category, challenge);

        expect(result).toBeNull();
    });
});

describe('loadCategoryDetails', () => {
    it('should load category details successfully', async () => {
        const mockCategory = 'exampleCategory';
        const mockCategoryConfig = {
            friendlyName: 'Example Category',
            shortDescription: 'This is an example category'
        };
        const mockChallenges = [
            { name: 'challenge1', friendlyName: 'Challenge 1', difficulty: 1, shortDescription: 'Description 1', templates: [], tags: [], categoryRef: mockCategory },
            { name: 'challenge2', friendlyName: 'Challenge 2', difficulty: 2, shortDescription: 'Description 2', templates: [], tags: [], categoryRef: mockCategory }
        ];

        (readJsonFile as jest.Mock).mockResolvedValue(mockCategoryConfig);
        (loadAllChallengesOfCategory as jest.Mock).mockResolvedValue(mockChallenges);

        const result = await loadCategoryDetails(mockCategory);

        expect(result).toEqual({
            name: mockCategory,
            friendlyName: mockCategoryConfig.friendlyName,
            shortDescription: mockCategoryConfig.shortDescription,
            challenges: mockChallenges
        });
    });

    it('should return null if category config is not found', async () => {
        const mockCategory = 'nonExistentCategory';

        (readJsonFile as jest.Mock).mockResolvedValue(null);

        const result = await loadCategoryDetails(mockCategory);

        expect(result).toBeNull();
    });

    it('should throw an error if reading the file fails', async () => {
        const mockCategory = 'errorCategory';

        (readJsonFile as jest.Mock).mockRejectedValue(new Error('File read error'));

        await expect(loadCategoryDetails(mockCategory)).rejects.toThrow('File read error');
    });
});

describe('loadAllChallenges', () => {
    it('should load all challenges successfully', async () => {
        const mockCategories = ['category1', 'category2'];
        const mockChallengesCategory1 = [
            { name: 'challenge1', friendlyName: 'Challenge 1', difficulty: 1, shortDescription: 'Description 1', templates: [], tags: [], categoryRef: 'category1' }
        ];
        const mockChallengesCategory2 = [
            { name: 'challenge2', friendlyName: 'Challenge 2', difficulty: 2, shortDescription: 'Description 2', templates: [], tags: [], categoryRef: 'category2' }
        ];

        (loadCategories as jest.Mock).mockResolvedValue(mockCategories);
        (loadAllChallengesOfCategory as jest.Mock).mockImplementation((category) => {
            if (category === 'category1') return Promise.resolve(mockChallengesCategory1);
            if (category === 'category2') return Promise.resolve(mockChallengesCategory2);
            return Promise.resolve([]);
        });

        const result = await loadAllChallenges();

        expect(result).toEqual([...mockChallengesCategory1, ...mockChallengesCategory2]);
    });

    it('should return an empty array if no categories are found', async () => {
        (loadCategories as jest.Mock).mockResolvedValue([]);

        const result = await loadAllChallenges();

        expect(result).toEqual([]);
    });

    it('should throw an error if loading categories fails', async () => {
        (loadCategories as jest.Mock).mockRejectedValue(new Error('Load categories error'));

        await expect(loadAllChallenges()).rejects.toThrow('Load categories error');
    });
});

describe('loadSidebarInformation', () => {
    it('should load sidebar information successfully', async () => {
        const mockCategories = ['category1', 'category2'];
        const mockCategoryDetails1 = {
            name: 'category1',
            friendlyName: 'Category 1',
            shortDescription: 'Description 1',
            challenges: []
        };
        const mockCategoryDetails2 = {
            name: 'category2',
            friendlyName: 'Category 2',
            shortDescription: 'Description 2',
            challenges: []
        };
        const mockChallengesCategory1 = [
            { name: 'challenge1', friendlyName: 'Challenge 1', difficulty: 1, shortDescription: 'Description 1', templates: [], tags: [], categoryRef: 'category1' }
        ];
        const mockChallengesCategory2 = [
            { name: 'challenge2', friendlyName: 'Challenge 2', difficulty: 2, shortDescription: 'Description 2', templates: [], tags: [], categoryRef: 'category2' }
        ];

        (loadCategories as jest.Mock).mockResolvedValue(mockCategories);
        (loadAllChallengesOfCategory as jest.Mock).mockImplementation((category) => {
            if (category === 'category1') return Promise.resolve(mockChallengesCategory1);
            if (category === 'category2') return Promise.resolve(mockChallengesCategory2);
            return Promise.resolve([]);
        });
        (readJsonFile as jest.Mock).mockImplementation((path) => {
            if (path.includes('category1')) return Promise.resolve(mockCategoryDetails1);
            if (path.includes('category2')) return Promise.resolve(mockCategoryDetails2);
            return Promise.resolve(null);
        });

        const result = await loadSidebarInformation();

        expect(result).toEqual([
            { name: '/', friendlyName: 'Übersicht' },
            {
                name: 'category1',
                friendlyName: 'Category 1',
                challenges: mockChallengesCategory1
            },
            {
                name: 'category2',
                friendlyName: 'Category 2',
                challenges: mockChallengesCategory2
            }
        ]);
    });

    it('should return an empty array if no categories are found', async () => {
        (loadCategories as jest.Mock).mockResolvedValue([]);

        const result = await loadSidebarInformation();

        expect(result).toEqual([{ name: '/', friendlyName: 'Übersicht' }]);
    });

    it('should throw an error if loading categories fails', async () => {
        (loadCategories as jest.Mock).mockRejectedValue(new Error('Load categories error'));

        await expect(loadSidebarInformation()).rejects.toThrow('Load categories error');
    });
});