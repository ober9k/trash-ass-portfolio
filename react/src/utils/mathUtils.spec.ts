import { describe, expect, it } from "vitest";
import { calculatePercentGain } from "./mathUtils";

describe("mathUtils", () => {

  describe("calculatePercentGain()", () => {

    describe("when given x > y", () => {

      it("should return a positive gain", () => {
        const x = 200, y = 100;
        expect(calculatePercentGain(x, y)).toBeGreaterThan(0);
      });

      it("should return the correct positive gain", () => {
        const x = 200, y = 100;
        expect(calculatePercentGain(x, y)).toBe(1.0);
      });

    });

    describe("when given x < y", () => {

      it("should return a negative gain", () => {
        const x = 100, y = 200;
        expect(calculatePercentGain(x, y)).toBeLessThan(0);
      });

      it("should return the correct negative gain", () => {
        const x = 100, y = 200;
        expect(calculatePercentGain(x, y)).toBe(-0.5);
      });

    });

    describe("when given x === y", () => {

      it("should return a zero gain", () => {
        const x = 100, y = 100;
        expect(calculatePercentGain(x, y)).toBe(0);
      });

    });

  });

});
