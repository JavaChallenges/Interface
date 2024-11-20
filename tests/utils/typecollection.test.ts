import {
    CategoryDetails,
    ChallengeDetails, Contribrutor,
    JSONObject,
    SidebarEntry,
    Tag,
    Template,
    TestResult
} from "@/utils/typecollection";

describe('Type Definitions', () => {

    it('JSONObject accepts valid JSON objects', () => {
        const jsonObject: JSONObject = {
            key1: "value",
            key2: 123,
            key3: false,
            key4: null,
            key5: ["string", 123, true],
            key6: { nestedKey: "nestedValue" }
        };
        expect(jsonObject).toBeDefined();
    });

    it('TestResult accepts valid values', () => {
        const testResult: TestResult = {
            name: "Test 1",
            failtype: "Error",
            failmessage: "An error occurred",
            systemout: "Output",
            failError: "Stack trace"
        };
        expect(testResult).toBeDefined();
    });

    it('Template accepts valid values', () => {
        const template: Template = {
            title: "Template 1",
            content: "Content",
            classname: "ClassName",
            whitelist: ["item1", "item2"]
        };
        expect(template).toBeDefined();
    });

    it('Tag accepts valid values', () => {
        const tag: Tag = {
            name: "Tag 1",
            color: "red"
        };
        expect(tag).toBeDefined();
    });

    it('ChallengeDetails accepts valid values', () => {
        const challengeDetails: ChallengeDetails = {
            name: "Challenge 1",
            categoryRef: "Category 1",
            friendlyName: "Friendly Challenge 1",
            difficulty: 5,
            shortDescription: "Short description",
            templates: [{ title: "Template 1", content: "Content", classname: "ClassName", whitelist: ["item1"] }],
            tags: [{ name: "Tag 1", color: "red" }]
        };
        expect(challengeDetails).toBeDefined();
    });

    it('SidebarEntry accepts valid values', () => {
        const sidebarEntry: SidebarEntry = {
            name: "Entry 1",
            friendlyName: "Friendly Entry 1",
            challenges: [{
                name: "Challenge 1",
                categoryRef: "Category 1",
                friendlyName: "Friendly Challenge 1",
                difficulty: 5,
                shortDescription: "Short description",
                templates: [{ title: "Template 1", content: "Content", classname: "ClassName", whitelist: ["item1"] }],
                tags: [{ name: "Tag 1", color: "red" }]
            }]
        };
        expect(sidebarEntry).toBeDefined();
    });

    it('CategoryDetails accepts valid values', () => {
        const categoryDetails: CategoryDetails = {
            name: "Category 1",
            friendlyName: "Friendly Category 1",
            shortDescription: "Short description",
            challenges: [{
                name: "Challenge 1",
                categoryRef: "Category 1",
                friendlyName: "Friendly Challenge 1",
                difficulty: 5,
                shortDescription: "Short description",
                templates: [{ title: "Template 1", content: "Content", classname: "ClassName", whitelist: ["item1"] }],
                tags: [{ name: "Tag 1", color: "red" }]
            }]
        };
        expect(categoryDetails).toBeDefined();
    });

    it('Contribrutor accepts valid values', () => {
        const contribrutor: Contribrutor = {
            name: "Contributor 1",
            type: "Type 1",
            contributions: 10,
            avatar_url: "http://example.com/avatar.jpg",
            url: "http://example.com"
        };
        expect(contribrutor).toBeDefined();
    });
});