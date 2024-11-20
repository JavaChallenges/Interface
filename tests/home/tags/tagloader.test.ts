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

describe('filterChallengesByTag', () => {
    it('should return challenges that contain the specified tag', async () => {
        const mockChallenges = [
            { tags: [{ name: 'tag1', color: 'red' }] },
            { tags: [{ name: 'tag2', color: 'blue' }] }
        ];
        (loadAllChallenges as jest.Mock).mockResolvedValue(mockChallenges);

        const result = await filterChallengesByTag({ name: 'tag1', color: 'red' });
        expect(result).toEqual([{ tags: [{ name: 'tag1', color: 'red' }] }]);
    });

    it('should return an empty array if no challenges contain the specified tag', async () => {
        const mockChallenges = [
            { tags: [{ name: 'tag2', color: 'blue' }] }
        ];
        (loadAllChallenges as jest.Mock).mockResolvedValue(mockChallenges);

        const result = await filterChallengesByTag({ name: 'tag1', color: 'red' });
        expect(result).toEqual([]);
    });
});

describe('getTagForName', () => {
    it('should return the tag object for the given tag name', async () => {
        const mockTags = [
            { name: 'tag1', color: 'red' },
            { name: 'tag2', color: 'blue' }
        ];
        (loadAllTags as jest.Mock).mockResolvedValue(mockTags);

        const result = await getTagForName('tag1');
        expect(result).toEqual({ name: 'tag1', color: 'red' });
    });

    it('should return undefined if the tag name does not exist', async () => {
        const mockTags = [
            { name: 'tag2', color: 'blue' }
        ];
        (loadAllTags as jest.Mock).mockResolvedValue(mockTags);

        const result = await getTagForName('tag1');
        expect(result).toBeUndefined();
    });
});

describe('matchColorToTagName', () => {
    it('should return the color for the given tag name', async () => {
        const mockTags = [
            { name: 'tag1', color: 'red' },
            { name: 'tag2', color: 'blue' }
        ];
        (loadAllTags as jest.Mock).mockResolvedValue(mockTags);

        const result = await matchColorToTagName('tag1');
        expect(result).toBe('red');
    });

    it('should return "#000000" if the tag name does not exist', async () => {
        const mockTags = [
            { name: 'tag2', color: 'blue' }
        ];
        (loadAllTags as jest.Mock).mockResolvedValue(mockTags);

        const result = await matchColorToTagName('tag1');
        expect(result).toBe('#000000');
    });
});

describe('loadUsedAllTags', () => {
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