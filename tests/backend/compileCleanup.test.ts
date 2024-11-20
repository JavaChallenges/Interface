import { checkWhitelist, checkBlacklist, filterErrorMessages, getErrorPositionsFromErrormessage } from "@/app/backend/compileCleanup";
import { readJsonFile } from "@/app/backend/IO";

jest.mock("@/app/backend/IO");

/**
 * Test suite for the `checkWhitelist` function.
 */
describe("checkWhitelist", () => {
    it("removes imports not in the whitelist", () => {
        const content = "import java.util.List;\nimport java.util.ArrayList;";
        const whitelist = ["java.util.List"];
        const result = checkWhitelist(content, whitelist);
        expect(result).toBe("import java.util.List;\n");
    });

    it("keeps imports in the whitelist", () => {
        const content = "import java.util.List;\nimport java.util.ArrayList;";
        const whitelist = ["java.util.List", "java.util.ArrayList"];
        const result = checkWhitelist(content, whitelist);
        expect(result).toBe(content);
    });

    it("handles content with no imports", () => {
        const content = "public class TestClass {}";
        const whitelist = ["java.util.List"];
        const result = checkWhitelist(content, whitelist);
        expect(result).toBe(content);
    });
});

/**
 * Test suite for the `checkBlacklist` function.
 */
describe("checkBlacklist", () => {
    it("removes imports in the blacklist", async () => {
        (readJsonFile as jest.Mock).mockResolvedValue({ blacklist: ["java.util.ArrayList"] });
        const content = "import java.util.List;\nimport java.util.ArrayList;";
        const result = await checkBlacklist(content);
        expect(result).toBe("import java.util.List;\n");
    });

    it("keeps imports not in the blacklist", async () => {
        (readJsonFile as jest.Mock).mockResolvedValue({ blacklist: ["java.util.HashMap"] });
        const content = "import java.util.List;\nimport java.util.ArrayList;";
        const result = await checkBlacklist(content);
        expect(result).toBe(content);
    });

    it("handles empty blacklist", async () => {
        (readJsonFile as jest.Mock).mockResolvedValue({ blacklist: [] });
        const content = "import java.util.List;\nimport java.util.ArrayList;";
        const result = await checkBlacklist(content);
        expect(result).toBe(content);
    });

    it("handles missing blacklist file", async () => {
        (readJsonFile as jest.Mock).mockResolvedValue(null);
        const content = "import java.util.List;\nimport java.util.ArrayList;";
        const result = await checkBlacklist(content);
        expect(result).toBe(content);
    });
});

/**
 * Test suite for the `filterErrorMessages` function.
 */
describe("filterErrorMessages", () => {
    it("filters out unnecessary information from error messages", () => {
        const errormessage = "[INFO] ---\n[ERROR] COMPILATION ERROR :\n[INFO] ---\n[ERROR] /path/to/src/Test.java:[10,5] error message\n[INFO] 1 error\n[INFO] ---";
        const result = filterErrorMessages(errormessage);
        expect(result).toBe("---\nCOMPILATION ERROR :\n---\nTest.java:[10,5] error message\n1 error\n---");
    });

    it("handles error messages without compilation errors", () => {
        const errormessage = "Some other error message";
        const result = filterErrorMessages(errormessage);
        expect(result).toBe(errormessage);
    });
});

/**
 * Test suite for the `getErrorPositionsFromErrormessage` function.
 */
describe("getErrorPositionsFromErrormessage", () => {
    it("extracts error positions from error messages", () => {
        const errormessage = "Test.java:[10,5] error message\nAnotherTest.java:[15,10] another error message";
        const result = getErrorPositionsFromErrormessage(errormessage);
        expect(result).toEqual({
            Test: [9],
            AnotherTest: [14]
        });
    });

    it("handles error messages without positions", () => {
        const errormessage = "Some other error message";
        const result = getErrorPositionsFromErrormessage(errormessage);
        expect(result).toEqual({});
    });
});