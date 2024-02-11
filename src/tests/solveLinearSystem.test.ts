import solveLinearSystem from "../functions/solveLinearSystem";
import { toStrictEqual1Array } from "./toStrictEqualArray";

test("solve_linear_system_test-1", () => {
  const matrix = [
    [5, -3, 7],
    [-1, 4, 3],
    [6, -2, 5],
  ];

  const constants = [13, 13, 12];

  const output = [1, 2, 2];

  const result = solveLinearSystem(matrix, constants);
  expect(toStrictEqual1Array(output, result ?? [])).toBe(true);
});

test("solve_linear_system_test-2", () => {
  const matrix = [
    [6, 2, 5],
    [-3, 4, -1],
    [1, 4, 3],
  ];

  const constants = [1, 6, 6];

  const output = [-1, 1, 1];

  const result = solveLinearSystem(matrix, constants);
  expect(toStrictEqual1Array(output, result ?? [])).toBe(true);
});

test("solve_linear_system_test-3", () => {
  const matrix = [
    [-2, -1, -2],
    [4, -2, 1],
    [1, 3, -5],
  ];

  const constants = [1, 5, 3];

  const output = [1, -1, -1];

  const result = solveLinearSystem(matrix, constants);
  expect(toStrictEqual1Array(output, result ?? [])).toBe(true);
});
