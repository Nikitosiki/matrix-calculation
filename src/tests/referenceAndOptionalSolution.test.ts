import { optimalSolution } from "../functions/optimalSolution";
import { referenceSolution } from "../functions/referenceSolution";
import { toStrictEqual1Array, toStrictEqual2Array } from "./toStrictEqualArray";

test("reference_solution_test-1", () => {
  const matrix = [
    [1, 1, -1, -2, 6],
    [-1, -1, -1, 1, -5],
    [2, -1, 3, 4, 10],
    [-1, -2, 1, 1, 0],
  ];

  const correct = [
    [1, 0, -2, -1, 1],
    [-1, 1, 1, -1, 5],
    [2, -3, 1, 6, 0],
    [-1, -1, 2, 0, 5],
  ];
  const correctX = [5, 0, 0, 0];

  const reference = referenceSolution(matrix);
  // console.log("Search for a reference junction:", reference);

  expect(toStrictEqual2Array(correct, reference.matrix)).toBe(true);
  expect(toStrictEqual1Array(correctX, reference.solution)).toBe(true);
});

test("optional_solution_test-1", () => {
  const matrix = [
    [1, 1, -1, -2, 6],
    [-1, -1, -1, 1, -5],
    [2, -1, 3, 4, 10],
    [-1, -2, 1, 1, 0],
  ];

  const correct = [
    [4, 2, 1, 1, 22],
    [1.5, 0.5, 0.5, 1, 8],
    [1.5, 1.5, 0.5, -1, 9],
    [5.5, 3.5, 1.5, 2, 36],
  ];
  const correctX = [0, 22, 0, 8];

  const reference = referenceSolution(matrix);
  // console.log("Search for a reference junction:", reference);

  const optimal = optimalSolution(reference.matrix, reference.positionXY);
  // console.log("Search for a optional junction:", optimal);

  expect(toStrictEqual2Array(correct, optimal.matrix)).toBe(true);
  expect(toStrictEqual1Array(correctX, optimal.solution)).toBe(true);
});

test("reference_solution_test-2", () => {
  const matrix = [
    [1, 1, -1, -2, 6],
    [-1, -1, -1, 1, -5],
    [2, -1, 3, 4, 10],
    [-2, 3, 0, -3, 0],
  ];

  const correct = [
    [1, -0, -2, -1, 1],
    [-1, 1, 1, -1, 5],
    [2, -3, 1, 6, -0],
    [-2, 5, 2, -5, 10],
  ];
  const correctX = [5, 0, 0, 0];

  const reference = referenceSolution(matrix);
  // console.log("Search for a reference junction:", reference);

  expect(toStrictEqual2Array(correct, reference.matrix)).toBe(true);
  expect(toStrictEqual1Array(correctX, reference.solution)).toBe(true);
});

test("optional_solution_test-2", () => {
  const matrix = [
    [1, 1, -1, -2, 6],
    [-1, -1, -1, 1, -5],
    [2, -1, 3, 4, 10],
    [-2, 3, 0, -3, 0],
  ];

  const correct = [
    [-0.5, 1.5, -2.5, -4, 1],
    [0.5, -0.5, 1.5, 2, 5],
    [0.5, -1.5, 0.5, 3, 0],
    [1, 2, 3, 1, 10],
  ];
  const correctX = [5, 0, 0, 0];

  const reference = referenceSolution(matrix);
  // console.log("Search for a reference junction:", reference);

  const optimal = optimalSolution(reference.matrix, reference.positionXY);
  // console.log("Search for a optional junction:", optimal);

  expect(toStrictEqual2Array(correct, optimal.matrix)).toBe(true);
  expect(toStrictEqual1Array(correctX, optimal.solution)).toBe(true);
});

test("reference_solution_test-3-14", () => {
  const matrix = [
    [2, -1, 4, 4, 10],
    [1, 1, 1, -1, 5],
    [-1, -2, -2, -4, -12],
    [-2, -1, 1, 1, 0],
  ];

  const correct = [
    [0.333, 1, 1.667, 0.333, 5],
    [1.333, 2, 2.667, 0.333, 10],
    [4, 7, 10, 2, 28],
    [1, -1, 2, 0, 5],
  ];
  const correctX = [0, 10, 0, 5];

  const reference = referenceSolution(matrix);
  // console.log("Search for a reference junction:", reference);

  expect(toStrictEqual2Array(correct, reference.matrix)).toBe(true);
  expect(toStrictEqual1Array(correctX, reference.solution)).toBe(true);
});

test("optional_solution_test-3-14", () => {
  const matrix = [
    [2, -1, 4, 4, 10],
    [1, 1, 1, -1, 5],
    [-1, -2, -2, -4, -12],
    [-2, -1, 1, 1, 0],
  ];

  const correct = [
    [-0.238, -0.143, 0.238, 0.047, 1],
    [0.19, -0.286, -0.19, -0.238, 2],
    [0.571, 0.143, 1.429, 0.286, 4],
    [1.571, 0.143, 3.429, 0.286, 9],
  ];
  const correctX = [4, 2, 0, 1];

  const reference = referenceSolution(matrix);
  // console.log("Search for a reference junction:", reference);

  const optimal = optimalSolution(reference.matrix, reference.positionXY);
  // console.log("Search for a optional junction:", optimal);

  expect(toStrictEqual2Array(correct, optimal.matrix)).toBe(true);
  expect(toStrictEqual1Array(correctX, optimal.solution)).toBe(true);
});
