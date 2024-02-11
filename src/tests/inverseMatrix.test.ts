import inverseMatrix from "../functions/inverseMatrix";
import { roundedMatrix } from "../functions/utils";
import { toStrictEqual2Array } from "./toStrictEqualArray";

test("inverse_matrix_test-1", () => {
  const matrix = [
    [5, -3, 7],
    [-1, 4, 3],
    [6, -2, 5],
  ];

  const inverse = [
    [-0.28, -0.011, 0.398],
    [-0.247, 0.183, 0.237],
    [0.237, 0.086, -0.183],
  ];

  const result = roundedMatrix(inverseMatrix(matrix) ?? []);
  expect(toStrictEqual2Array(result, inverse)).toBe(true);
});

test("inverse_matrix_test-2", () => {
  const matrix = [
    [6, 2, 5],
    [-3, 4, -1],
    [1, 4, 3],
  ];

  const inverse = [
    [0.5, 0.437, -0.687],
    [0.25, 0.406, -0.281],
    [-0.5, -0.687, 0.937],
  ];

  const result = roundedMatrix(inverseMatrix(matrix) ?? []);
  expect(toStrictEqual2Array(result, inverse)).toBe(true);
});

test("inverse_matrix_test-3", () => {
  const matrix = [
    [2, -1, 3],
    [-1, 2, 2],
    [1, 1, 1],
  ];

  const inverse = [
    [0, -0.333, 0.667],
    [-0.25, 0.083, 0.583],
    [0.25, 0.25, -0.25],
  ];

  const result = roundedMatrix(inverseMatrix(matrix) ?? []);
  expect(toStrictEqual2Array(result, inverse)).toBe(true);
});
