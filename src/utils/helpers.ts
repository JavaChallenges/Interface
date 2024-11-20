/**
 * Adjusts the shade of a given hex color by a specified magnitude.
 *
 * @param {string} hexColor - The hex color code to adjust.
 * @param {number} magnitude - The magnitude to adjust the color by. Positive values lighten the color, negative values darken it.
 * @returns {string} - The adjusted hex color code.
 */
export const newShade = (hexColor: string, magnitude: number): string => {
    hexColor = hexColor.replace(`#`, ``);
    if (hexColor.length === 6) {
        const decimalColor = parseInt(hexColor, 16);
        let r = (decimalColor >> 16) + magnitude;
        if (r > 255) r = 255;
        if (r < 0) r = 0;
        let g = (decimalColor & 0x0000ff) + magnitude;
        if (g > 255) g = 255;
        if (g < 0) g = 0;
        let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
        if (b > 255) b = 255;
        if (b < 0) b = 0;
        return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
    } else {
        return hexColor;
    }
};

/**
 * Fetches the latest release version from the GitHub API.
 *
 * @param {boolean} indev - If true, fetches the latest prerelease version. If false, fetches the latest stable release version.
 * @returns {Promise<string>} - A promise that resolves to the latest release version.
 * @throws Will throw an error if the fetch operation fails.
 */
export async function getVersion(indev: boolean): Promise<string> {
    const data = await fetchJsonFromUrl("https://api.github.com/repos/JavaChallenges/Challenges/releases")
    let version;
    for (const release of data) {
        if (indev && release.prerelease) {
            version = release.name
            break
        }
        if (!indev && !release.prerelease) {
            version = release.name
            break
        }
    }
    return version;
}

/**
 * Fetches JSON data from a given URL.
 *
 * @param {string} url - The URL to fetch JSON data from.
 * @returns - A promise that resolves to the fetched JSON data.
 * @throws Will throw an error if the fetch operation fails.
 */
async function fetchJsonFromUrl(url: string) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.error('Error fetching JSON data:', error);
        throw error;
    }
}