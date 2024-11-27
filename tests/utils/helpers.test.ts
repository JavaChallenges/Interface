import { newShade, getVersion } from "@/utils/helpers";

describe('newShade', () => {
    it('returns a lighter shade of the color', () => {
        const result = newShade("#000000", 50);
        expect(result).toBe("#323232");
    });

    it('returns a darker shade of the color', () => {
        const result = newShade("#ffffff", -50);
        expect(result).toBe("#cdcdcd");
    });

    it('handles invalid hex color gracefully', () => {
        const result = newShade("#zzz", 50);
        expect(result).toBe("zzz");
    });

    it('handles magnitude that exceeds color bounds', () => {
        const result = newShade("#000000", 300);
        expect(result).toBe("#ffffff");
    });

    it('handles magnitude that is below color bounds', () => {
        const result = newShade("#ffffff", -300);
        expect(result).toBe("#0");
    });
});

describe('getVersion', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    it('returns the latest release version in production', async () => {
        (global.fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: async () => [{ name: "v1.0.0", prerelease: false }]
        });
        const version = await getVersion(false);
        expect(version).toBe("v1.0.0");
    });

    it('returns the latest prerelease version in development', async () => {
        (global.fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: async () => [{ name: "v1.0.0-beta", prerelease: true }]
        });
        const version = await getVersion(true);
        expect(version).toBe("v1.0.0-beta");
    });

    it('handles no releases found', async () => {
        (global.fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: async () => []
        });
        const version = await getVersion(false);
        expect(version).toBeUndefined();
    });

    it('handles fetch error gracefully', async () => {
        (global.fetch as jest.Mock).mockRejectedValue(new Error("Network error"));
        await expect(getVersion(false)).rejects.toThrow("Network error");
    });
});