import { describe, expect, test } from "vitest";
import { calculatePercentGain } from "./mathUtils";


// 1. Suite: Groups related tests together
describe("mathUtils", () => {

  describe("calculatePercentGain()", () => {

    describe("when given positive gain", () => {
      test("should yield a positive percentage gain", () => {
        const result1 = calculatePercentGain(150, 100);
        const result2 = calculatePercentGain(125, 100);
        expect(result1).toBe(0.50);
        expect(result2).toBe(0.25);
      });
    });

    describe("when given neutral gain", () => {
      test("should yield neutral percentage gain", () => {
        const result1 = calculatePercentGain(100, 100);
        expect(result1).toBe(0);
      });
    });

    describe("when given negative gain", () => {
      test("should yield a negative percentage gain", () => {
        const result1 = calculatePercentGain(100, 200);
        const result2 = calculatePercentGain( 50, 200);
        expect(result1).toBe(-0.50);
        expect(result2).toBe(-0.75);
      });
    });

  });

});
