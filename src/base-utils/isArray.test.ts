import {isArray} from './index';

describe("Tests: isArray", () => {
    test("Check for null", () => {
        const value = null;
        expect(isArray(value)).toEqual(false);
    });
    test("Check for undefined", () => {
        const value = undefined;
        expect(isArray(value)).toEqual(false);
    });
    test("Check for string", () => {
        const value = 'string';
        expect(isArray(value)).toEqual(false);
    });
    test("Check for empty array", () => {
        const value: null[] = [];
        expect(isArray(value)).toEqual(true);
    });
    test("Check for array", () => {
        const value = [0, 1, 2, 3, 4];
        expect(isArray(value)).toEqual(true);
    });
});
