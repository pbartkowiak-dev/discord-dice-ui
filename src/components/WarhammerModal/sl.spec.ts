// @ts-nocheck
import { isProperSl } from "./sl";

describe("isProperSl", () => {
  test.each(["2e", "4e", "dh", "fast"])(
    'should return "true" for proper SL value',
    (val) => {
      expect(isProperSl(val)).toBe(true);
    }
  );

  test.each([
    "",
    "foo",
    "SL",
    "warhammer",
    "warhammer2eSL",
    "darkHeresy",
    2,
    null,
    undefined,
    false,
    NaN,
  ])('should return "false" for incorrect SL value', (val) => {
    expect(isProperSl(val)).toBe(false);
  });
});
