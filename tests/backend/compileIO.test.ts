import {copyTestFiles, parseTestResult, writeSourceFiles} from "@/app/backend/compileIO";
import fs from "fs";
import path from "node:path";
import {checkBlacklist, checkWhitelist} from "@/app/backend/compileCleanup";

jest.mock("fs");
jest.mock("node:path");
jest.mock("@/app/backend/compileCleanup");

/**
 * Test suite for the `writeSourceFiles` function.
 */
describe("writeSourceFiles", () => {
    const uuid = "test-uuid";
    const classes = [
        { name: "TestClass1", content: "public class TestClass1 {}" },
        { name: "TestClass2", content: "public class TestClass2 {}" }
    ];
    const whitelist = {
        "TestClass1": ["allowedMethod1"],
        "TestClass2": ["allowedMethod2"]
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    /**
     * Test case to verify that the directory is created if it does not exist.
     */
    it("creates the directory if it does not exist", async () => {
        (fs.existsSync as jest.Mock).mockReturnValue(false);
        (fs.mkdirSync as jest.Mock).mockImplementation(() => {});

        await writeSourceFiles(whitelist, uuid, classes);

        expect(fs.mkdirSync).toHaveBeenCalledWith(path.join("./workspace/", `${uuid}/src/`), { recursive: true });
    });

    /**
     * Test case to verify that the directory is not created if it already exists.
     */
    it("does not create the directory if it already exists", async () => {
        (fs.existsSync as jest.Mock).mockReturnValue(true);

        await writeSourceFiles(whitelist, uuid, classes);

        expect(fs.mkdirSync).not.toHaveBeenCalled();
    });

    /**
     * Test case to verify that the source files are written with the correct content.
     */
    it("writes the source files with the correct content", async () => {
        (fs.existsSync as jest.Mock).mockReturnValue(true);
        (checkWhitelist as jest.Mock).mockImplementation((content) => content);
        (checkBlacklist as jest.Mock).mockResolvedValue("filtered content");

        await writeSourceFiles(whitelist, uuid, classes);

        expect(fs.writeFileSync).toHaveBeenCalledWith(path.join("./workspace/", `${uuid}/src/`, "TestClass1.java"), "filtered content", "utf8");
        expect(fs.writeFileSync).toHaveBeenCalledWith(path.join("./workspace/", `${uuid}/src/`, "TestClass2.java"), "filtered content", "utf8");
    });

    /**
     * Test case to verify that no files are written when the classes array is empty.
     */
    it("handles empty classes array", async () => {
        (fs.existsSync as jest.Mock).mockReturnValue(true);

        await writeSourceFiles(whitelist, uuid, []);

        expect(fs.writeFileSync).not.toHaveBeenCalled();
    });

    /**
     * Test case to verify that files are written even if some whitelist entries are missing.
     */
    it("handles missing whitelist entries", async () => {
        (fs.existsSync as jest.Mock).mockReturnValue(true);
        (checkWhitelist as jest.Mock).mockImplementation((content) => content);
        (checkBlacklist as jest.Mock).mockResolvedValue("filtered content");

        const classesWithMissingWhitelist = [
            { name: "TestClass1", content: "public class TestClass1 {}" },
            { name: "TestClass3", content: "public class TestClass3 {}" }
        ];

        await writeSourceFiles(whitelist, uuid, classesWithMissingWhitelist);

        expect(fs.writeFileSync).toHaveBeenCalledWith(path.join("./workspace/", `${uuid}/src/`, "TestClass1.java"), "filtered content", "utf8");
        expect(fs.writeFileSync).toHaveBeenCalledWith(path.join("./workspace/", `${uuid}/src/`, "TestClass3.java"), "filtered content", "utf8");
    });
});

/**
 * Test suite for the `copyTestFiles` function.
 */
describe("copyTestFiles", () => {
    /**
     * Test case to verify that .java files are copied from source to test directory.
     */
    it("copies .java files from source to test directory", () => {
        (fs.existsSync as jest.Mock).mockReturnValue(true);
        (fs.readdirSync as jest.Mock).mockReturnValue(["Test1.java", "Test2.java"]);

        copyTestFiles("srcDir", "destDir");

        expect(fs.copyFileSync).toHaveBeenCalledWith(path.join("srcDir", "Test1.java"), path.join("destDir", "tests", "Test1.java"));
        expect(fs.copyFileSync).toHaveBeenCalledWith(path.join("srcDir", "Test2.java"), path.join("destDir", "tests", "Test2.java"));
    });

    /**
     * Test case to verify that non-java files are not copied from source to test directory.
     */
    it("does not copy non-java files from source to test directory", () => {
        (fs.existsSync as jest.Mock).mockReturnValue(true);
        (fs.readdirSync as jest.Mock).mockReturnValue(["Test1.java", "README.md"]);

        copyTestFiles("srcDir", "destDir");

        expect(fs.copyFileSync).toHaveBeenCalledWith(path.join("srcDir", "Test1.java"), path.join("destDir", "tests", "Test1.java"));
        expect(fs.copyFileSync).not.toHaveBeenCalledWith(path.join("srcDir", "README.md"), expect.anything());
    });
});

/**
 * Test suite for the `parseTestResult` function.
 */
describe("parseTestresult", () => {
    const uuid = "test-uuid";

    beforeEach(() => {
        jest.clearAllMocks();
    });

    /**
     * Test case to verify that an empty result is returned when there are no test files.
     */
    it("returns empty result when there are no test files", () => {
        jest.spyOn(fs, 'readdirSync').mockReturnValue([]);
        const result = parseTestResult(uuid);
        expect(result).toEqual({
            result: [],
            testamount: 0,
            failed: 0
        });
    });

    //TODO Fix tests
    /*
    it("parses test results correctly when there are no failures or errors", () => {
        jest.spyOn(fs, 'readdirSync').mockReturnValue([
            { name: "test-result.xml", isFile: () => true } as unknown as fs.Dirent
        ]);
        jest.spyOn(fs, 'readFileSync').mockReturnValue(`
            <testsuite>
                <testcase name="test1"/>
                <testcase name="test2"/>
            </testsuite>
        `);
        const result = parseTestResult(uuid);
        expect(result).toEqual({
            result: [
                { name: "test1" },
                { name: "test2" }
            ],
            testamount: 2,
            failed: 0
        });
    });

    it("parses test results correctly when there are failures", () => {
        jest.spyOn(fs, 'readdirSync').mockReturnValue([
            { name: "test-result.xml", isFile: () => true } as unknown as fs.Dirent
        ]);
        jest.spyOn(fs, 'readFileSync').mockReturnValue(`
            <testsuite>
                <testcase name="test1">
                    <failure type="AssertionError" message="expected true to be false">
                        <![CDATA[AssertionError: expected true to be false]]>
                    </failure>
                </testcase>
                <testcase name="test2"/>
            </testsuite>
        `);
        const result = parseTestResult(uuid);
        expect(result).toEqual({
            result: [
                {
                    name: "test1",
                    failType: "AssertionError",
                    failMessage: "expected true to be false",
                    failError: "AssertionError: expected true to be false",
                    systemout: undefined
                },
                { name: "test2" }
            ],
            testamount: 2,
            failed: 1
        });
    });

    it("parses test results correctly when there are errors", () => {
        jest.spyOn(fs, 'readdirSync').mockReturnValue([
            { name: "test-result.xml", isFile: () => true } as unknown as fs.Dirent
        ]);
        jest.spyOn(fs, 'readFileSync').mockReturnValue(`
            <testsuite>
                <testcase name="test1">
                    <error type="Error">
                        <![CDATA[Error occurred during execution]]>
                    </error>
                </testcase>
                <testcase name="test2"/>
            </testsuite>
        `);
        const result = parseTestResult(uuid);
        expect(result).toEqual({
            result: [
                {
                    name: "test1",
                    failType: "Error",
                    failMessage: "Error occurred during execution",
                    failError: "Error occurred during execution"
                },
                { name: "test2" }
            ],
            testamount: 2,
            failed: 1
        });
    });

    it("parses test results correctly when there is system output", () => {
        jest.spyOn(fs, 'readdirSync').mockReturnValue([
            { name: "test-result.xml", isFile: () => true } as unknown as fs.Dirent
        ]);
        jest.spyOn(fs, 'readFileSync').mockReturnValue(`
            <testsuite>
                <testcase name="test1">
                    <system-out>
                        <![CDATA[System output]]>
                    </system-out>
                </testcase>
                <testcase name="test2"/>
            </testsuite>
        `);
        const result = parseTestResult(uuid);
        expect(result).toEqual({
            result: [
                {
                    name: "test1",
                    systemout: "System output"
                },
                { name: "test2" }
            ],
            testamount: 2,
            failed: 0
        });
    });
    */
});