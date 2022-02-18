import {isArrayNotEmpty} from './index';

describe("Tests: isArrayNotEmpty", () => {
    test("Check for null", () => {
        const value = null;
        expect(isArrayNotEmpty(value)).toEqual(false);
    });
    test("Check negative", () => {
        const value: any[] = [];
        expect(isArrayNotEmpty(value)).toEqual(false);
    });
    test("Check positive", () => {
        const value = [0, 1, 2, 3, 4];
        expect(isArrayNotEmpty(value)).toEqual(true);
    });
});
