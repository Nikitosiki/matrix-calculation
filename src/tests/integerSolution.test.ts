import { integerSolution } from "../functions/integerSolution";
import { toStrictEqual1Array } from "./toStrictEqualArray";

test("integer_solution_test-1", () => {
  const matrix = [
    [2, 1, 6],
    [1, 3, 4],
    [-1, -4, 0]
  ];

  const positionXY = {
    top: ["x1", "x2"],
    left: ["y1", "y2"],
  };
  
  const correctX = [1, 1];

  const result = integerSolution(matrix, positionXY);

  console.log("Result (test-1):", result);

  expect(toStrictEqual1Array(correctX, result.solution)).toBe(true);
});

test("integer_solution_test-2", () => {
  const matrix = [
    [3, 2, 0, 10],
    [1, 4, 0, 11],
    [3, 3, 1, 13],
    [-4, -5, -1, 0],
  ];

  const positionXY = {
    top: ["x1", "x2", "x3"],
    left: ["y1", "y2", "y3"],
  };
  
  const correctX = [2, 2, 1];

  const result = integerSolution(matrix, positionXY);

  console.log("Result (test-2):", result);

  expect(toStrictEqual1Array(correctX, result.solution)).toBe(true);
});

test("integer_solution_v-14", () => {
  const matrix = [
    [1, 1, 1, 1, 1, 3, 4],
    [1, -4, 0, 1, 10, -1, 5],
    [-1, -3, -7, -1, -15, 1, -2],
    [-1, -2, 1, 1, 0, -1, 0],
  ];

  const positionXY = {
    top: ["x1", "x2", "x3", "x4", "x5", "x6"],
    left: ["0", "y1", "y2"]
  };
  
  const correctX = [0, 4, 0, 0, 0, 0];

  const result = integerSolution(matrix, positionXY);

  console.log("Result (v-14):", result);

  expect(toStrictEqual1Array(correctX, result.solution)).toBe(true);
});
