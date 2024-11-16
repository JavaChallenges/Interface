export const newShade = (hexColor: string, magnitude: number) => {
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