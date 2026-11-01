import { test } from "node:test";
import assert from "node:assert/strict";
import { calculateArea, calculateSpacing } from "../lib/calculators.ts";
test("area uses rectangle, circle and perpendicular triangle geometry", () => {
  assert.equal(calculateArea("rectangle", 10, 5, 10).area, 50);
  assert.ok(Math.abs(calculateArea("rectangle", 10, 5, 10).total - 55) < 1e-9);
  assert.equal(calculateArea("triangle", 10, 5).area, 25);
  assert.equal(calculateArea("circle", 2, 0).area, Math.PI * 4);
});
test("spacing counts inclusive positions with margins and zero usable area", () => {
  assert.equal(calculateSpacing(10, 5, 1, 0.5, true), 50);
  assert.equal(calculateSpacing(10, 0, 1, 0.5, false), 10);
  assert.equal(calculateSpacing(1, 1, 1, 1, true), 0);
  assert.equal(calculateSpacing(0.3, 0, 0.1, 0, false), 4);
});
test("rejects invalid dimensions, excessive allowances and impossible counts", () => {
  assert.throws(() => calculateArea("rectangle", -1, 5));
  assert.throws(() => calculateArea("circle", Infinity, 0));
  assert.throws(() => calculateArea("rectangle", 5, 5, 101));
  assert.throws(() => calculateSpacing(10, 5, 0, 0, true));
  assert.throws(() => calculateSpacing(100000, 100000, 0.01, 0, true));
});
