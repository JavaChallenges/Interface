import { loadAllChallenges } from "@/app/home/challengeloader";
import { loadAllTags } from "@/app/backend/IO";
import {
    filterChallengesByTag,
    getTagForName,
    loadUsedAllTags,
    matchColorToTagName
} from "@/app/home/tags/[tag]/tagloader";

jest.mock('@/app/home/challengeloader', () => ({
    loadAllChallenges: jest.fn()
}));

jest.mock('@/app/backend/IO', () => ({
    loadAllTags: jest.fn()
}));

/**
 * Test suite for the `filterChallengesByTag` function.
 */
describe('filterChallengesByTag', () => {
    /**
     * Test case for returning challenges that contain the specified tag.
     * It should return an array of challenges containing the specified tag.
     */
    it('should return challenges that contain the specified tag', async () => {
        const mockChallenges = [
            { tags: [{ name: 'tag1', color: 'red' }] },
            { tags: [{ name: 'tag2', color: 'blue' }] }
        ];
        (loadAllChallenges as jest.Mock).mockResolvedValue(mockChallenges);

        const result = await filterChallengesByTag({ name: 'tag1', color: 'red' });
        expect(result).toEqual([{ tags: [{ name: 'tag1', color: 'red' }] }]);
    });

    /**
     * Test case for returning an empty array if no challenges contain the specified tag.
     * It should return an empty array when no challenges contain the specified tag.
     */
    it('should return an empty array if no challenges contain the specified tag', async () => {
        const mockChallenges = [
            { tags: [{ name: 'tag2', color: 'blue' }] }
        ];
        (loadAllChallenges as jest.Mock).mockResolvedValue(mockChallenges);

        const result = await filterChallengesByTag({ name: 'tag1', color: 'red' });
        expect(result).toEqual([]);
    });
});

/**
 * Test suite for the `getTagForName` function.
 */
describe('getTagForName', () => {
    /**
     * Test case for returning the tag object for the given tag name.
     * It should return the tag object when the tag name exists.
     */
    it('should return the tag object for the given tag name', async () => {
        const mockTags = [
            { name: 'tag1', color: 'red' },
            { name: 'tag2', color: 'blue' }
        ];
        (loadAllTags as jest.Mock).mockResolvedValue(mockTags);

        const result = await getTagForName('tag1');
        expect(result).toEqual({ name: 'tag1', color: 'red' });
    });

    /**
     * Test case for returning undefined if the tag name does not exist.
     * It should return undefined when the tag name does not exist.
     */
    it('should return undefined if the tag name does not exist', async () => {
        const mockTags = [
            { name: 'tag2', color: 'blue' }
        ];
        (loadAllTags as jest.Mock).mockResolvedValue(mockTags);

        const result = await getTagForName('tag1');
        expect(result).toBeUndefined();
    });
});

/**
 * Test suite for the `matchColorToTagName` function.
 */
describe('matchColorToTagName', () => {
    /**
     * Test case for returning the color for the given tag name.
     * It should return the color of the tag when the tag name exists.
     */
    it('should return the color for the given tag name', async () => {
        const mockTags = [
            { name: 'tag1', color: 'red' },
            { name: 'tag2', color: 'blue' }
        ];
        (loadAllTags as jest.Mock).mockResolvedValue(mockTags);

        const result = await matchColorToTagName('tag1');
        expect(result).toBe('red');
    });

    /**
     * Test case for returning "#000000" if the tag name does not exist.
     * It should return "#000000" when the tag name does not exist.
     */
    it('should return "#000000" if the tag name does not exist', async () => {
        const mockTags = [
            { name: 'tag2', color: 'blue' }
        ];
        (loadAllTags as jest.Mock).mockResolvedValue(mockTags);

        const result = await matchColorToTagName('tag1');
        expect(result).toBe('#000000');
    });
});

/**
 * Test suite for the `loadUsedAllTags` function.
 */
describe('loadUsedAllTags', () => {
    /**
     * Test case for returning an array of used tags with their usage count.
     * It should return an array of objects containing tags and their usage count.
     */
    it('should return an array of used tags with their usage count', async () => {
        const mockChallenges = [
            { tags: [{ name: 'tag1', color: 'red' }] },
            { tags: [{ name: 'tag1', color: 'red' }, { name: 'tag2', color: 'blue' }] }
        ];
        const mockTags = [
            { name: 'tag1', color: 'red' },
            { name: 'tag2', color: 'blue' }
        ];
        (loadAllChallenges as jest.Mock).mockResolvedValue(mockChallenges);
        (loadAllTags as jest.Mock).mockResolvedValue(mockTags);

        const result = await loadUsedAllTags();
        expect(result).toEqual([
            { amount: 2, tag: { name: 'tag1', color: 'red' } },
            { amount: 1, tag: { name: 'tag2', color: 'blue' } }
        ]);
    });

    /**
     * Test case for returning an empty array if no tags are used in challenges.
     * It should return an empty array when no tags are used in challenges.
     */
    it('should return an empty array if no tags are used in challenges', async () => {
        const mockChallenges = [
            { tags: [{ name: 'tag3', color: 'green' }] }
        ];
        const mockTags = [
            { name: 'tag1', color: 'red' },
            { name: 'tag2', color: 'blue' }
        ];
        (loadAllChallenges as jest.Mock).mockResolvedValue(mockChallenges);
        (loadAllTags as jest.Mock).mockResolvedValue(mockTags);

        const result = await loadUsedAllTags();
        expect(result).toEqual([]);
    });
});