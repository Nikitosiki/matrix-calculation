import { optimalSolution } from "../functions/optimalSolution";
import { referenceSolution } from "../functions/referenceSolution";
import { removeNullLines } from "../functions/removeNullLine";
import { Transport, solveTransport } from "../functions/transportSolution";
import { toStrictEqual2Array } from "./toStrictEqualArray";

test("transportSolution_test-1", () => {
  const input: Transport = {
    rowsPossibility: [30, 20, 50],
    colsNeed: [10, 65, 25],
    matrix: [
      [6, 3, 2],
      [2, 1, 5],
      [3, 4, 1],
    ],
  };

  const expectedCost = 225;
  const expectedResult = [
    [0, 30, 0],
    [0, 20, 0],
    [10, 15, 25],
  ];

  console.log("Result (test-1):");

  const result = solveTransport(input);

  console.log("Result plan: ", result.solve);
  console.log("Cost by plan: ", result.price);

  expect(toStrictEqual2Array(expectedResult, result.solve)).toBe(true);
  expect(result.price).toBe(expectedCost);
});

test("transportSolution_test-2", () => {
  const input: Transport = {
    rowsPossibility: [120, 100, 80],
    colsNeed: [90, 90, 120],
    matrix: [
      [7, 6, 4],
      [3, 8, 5],
      [2, 3, 7],
    ],
  };

  const expectedCost = 1060;
  const expectedResult = [
    [0, 10, 110],
    [90, 0, 10],
    [0, 80, 0],
  ];

  console.log("Result (test-2):");

  const result = solveTransport(input);

  console.log("Result plan: ", result.solve);
  console.log("Cost by plan: ", result.price);

  expect(toStrictEqual2Array(expectedResult, result.solve)).toBe(true);
  expect(result.price).toBe(expectedCost);
});

test("transportSolution_test-v14", () => {
  const input: Transport = {
    rowsPossibility: [95, 75, 45],
    colsNeed: [65, 45, 50, 55],
    matrix: [
      [10, 5, 7, 8],
      [8, 9, 8, 5],
      [7, 6, 5, 9],
    ],
  };

  const expectedCost = 1325;
  const expectedResult = [
    [0, 45, 50, 0],
    [20, 0, 0, 55],
    [45, 0, 0, 0],
  ];

  console.log("Result (test-v14):");

  const result = solveTransport(input);

  console.log("Result plan: ", result.solve);
  console.log("Cost by plan: ", result.price);

  expect(toStrictEqual2Array(expectedResult, result.solve)).toBe(true);
  expect(result.price).toBe(expectedCost);
});

// ----------------------------------------------------------------

test("transportSolution_test-simplex-1", () => {
  const input: number[][] = [
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 30],
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 20],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 50],
    [-1, 0, 0, -1, 0, 0, -1, 0, 0, -10],
    [0, -1, 0, 0, -1, 0, 0, -1, 0, -65],
    [0, 0, -1, 0, 0, -1, 0, 0, -1, -25],
    [6, 3, 2, 2, 1, 5, 3, 4, 1, 0],
  ];

  const expectedCost = 225;

  const xy = {
    top: ["x1", "x2", "x3", "x4", "x5", "x6", "x7", "x8", "x9"],
    left: ["y1", "y2", "y3", "y4", "y5", "y6"],
  };

  const matrixWithoutNullLines = removeNullLines(input, xy);
  const reference = referenceSolution(
    matrixWithoutNullLines.matrix!,
    matrixWithoutNullLines.positionXY,
  );
  const optimal = optimalSolution(reference.matrix!, reference.positionXY);

  console.log("Result (test-simplex-1):");
  console.log("Removing null lines: ", matrixWithoutNullLines.matrix);
  console.log("Reference: ", reference.matrix);
  console.log("Optimal: ", optimal.matrix);

  const cost = Math.abs(optimal.matrix?.slice(-1)[0]?.slice(-1)[0]);

  console.log("Cost: ", cost);

  expect(cost).toBe(expectedCost);
});

test("transportSolution_test-simplex-2", () => {
  const input: number[][] = [
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 120],
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 100],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 80],
    [-1, 0, 0, -1, 0, 0, -1, 0, 0, -90],
    [0, -1, 0, 0, -1, 0, 0, -1, 0, -90],
    [0, 0, -1, 0, 0, -1, 0, 0, -1, -120],
    [7, 6, 4, 3, 8, 5, 2, 3, 7, 0],
  ];

  const expectedCost = 1060;

  const xy = {
    top: ["x1", "x2", "x3", "x4", "x5", "x6", "x7", "x8", "x9"],
    left: ["y1", "y2", "y3", "y4", "y5", "y6"],
  };

  const matrixWithoutNullLines = removeNullLines(input, xy);
  const reference = referenceSolution(
    matrixWithoutNullLines.matrix!,
    matrixWithoutNullLines.positionXY,
  );
  const optimal = optimalSolution(reference.matrix!, reference.positionXY);

  console.log("Result (test-simplex-2):");
  console.log("Removing null lines: ", matrixWithoutNullLines.matrix);
  console.log("Reference: ", reference.matrix);
  console.log("Optimal: ", optimal.matrix);

  const cost = Math.abs(optimal.matrix?.slice(-1)[0]?.slice(-1)[0]);

 console.log("Cost: ", cost);

  expect(cost).toBe(expectedCost);
});

test("transportSolution_test-simplex-v14", () => {
  const input: number[][] = [
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 95],
    [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 75],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 45],
    [-1, 0, 0, 0, -1, 0, 0, 0, -1, 0, 0, 0, -65],
    [0, -1, 0, 0, 0, -1, 0, 0, 0, -1, 0, 0, -45],
    [0, 0, -1, 0, 0, 0, -1, 0, 0, 0, -1, 0, -50],
    [0, 0, 0, -1, 0, 0, 0, -1, 0, 0, 0, -1, -55],
    [10, 5, 7, 8, 8, 9, 8, 5, 7, 6, 5, 9, 0],
  ];

  const expectedCost = 1325;

  const xy = {
    top: ["x1", "x2", "x3", "x4", "x5", "x6", "x7", "x8", "x9", "x10", "x11", "x12"],
    left: ["y1", "y2", "y3", "y4", "y5", "y6", "y7"],
  };

  const matrixWithoutNullLines = removeNullLines(input, xy);
  const reference = referenceSolution(
    matrixWithoutNullLines.matrix!,
    matrixWithoutNullLines.positionXY,
  );
  const optimal = optimalSolution(reference.matrix!, reference.positionXY);

  console.log("Result (test-simplex-v14):");
  console.log("Removing null lines: ", matrixWithoutNullLines.matrix);
  console.log("Reference: ", reference.matrix);
  console.log("Optimal: ", optimal.matrix);

  const cost = Math.abs(optimal.matrix?.slice(-1)[0]?.slice(-1)[0]);

 console.log("Cost: ", cost);

  expect(cost).toBe(expectedCost);
});
