import { findCompromiseSolution } from "../functions/multicriterialOptimization";
import { toStrictEqual1Array } from "./toStrictEqualArray";

test("multicriterialOptimization_test-1", () => {
  expect(true).toBe(true);
});

test("multicriterialOptimization_test-2", () => {
  const t1 = [
    [1, -1, 1, 1, 2],
    [1, 1, 1, -1, 2],
    [-1, 1, 1, 1, 2],
    [1, 1, -1, 1, 2],
    [-1, 8, -1, -4, 0],
  ];

  const t1z = [1, -8, 1, 4];

  const t2 = [
    [1, -1, 1, 1, 2],
    [1, 1, 1, -1, 2],
    [-1, 1, 1, 1, 2],
    [1, 1, -1, 1, 2],
    [-1, 3, 5, 1, 0],
  ];

  const t2z = [-1, 3, 5, 1];

  const t3 = [
    [1, -1, 1, 1, 2],
    [1, 1, 1, -1, 2],
    [-1, 1, 1, 1, 2],
    [1, 1, -1, 1, 2],
    [-3, -1, -1, 1, 0],
  ];

  const t3z = [3, 1, 1, -1];

  const expected = [1.46, 0, 0, 0.54];

  console.log("Result (test-2):");

  const compromiseVector = findCompromiseSolution(
    [t1, t2, t3],
    [t1z, t2z, t3z],
  );

  console.log("Compromise vector: ", compromiseVector)

  expect(toStrictEqual1Array(expected, compromiseVector)).toBe(true);
});
