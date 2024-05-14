import { optimalSolution } from "../functions/optimalSolution";
import {
  calcDualSolution,
  referenceSolution,
} from "../functions/referenceSolution";
import { removeNullLines } from "../functions/removeNullLine";
import { toStrictEqual1Array } from "./toStrictEqualArray";

test("calcDualSolution_test-1", () => {
  const matrix = [
    [1, 1, -1, -2, 6],
    [-1, -1, -1, 1, -5],
    [2, -1, 3, 4, 10],
    [-1, -2, 1, 1, 0],
  ];

  const positionXY = {
    top: ["x1", "x2", "x3", "x4"],
    left: ["y1", "y2", "y3"],
  };

  const correctX = [0, 22, 0, 8];
  const correctU = [3.5, 0, 1.5];

  const matrixWithoutNullLines = removeNullLines(matrix, positionXY);
  const reference = referenceSolution(
    matrixWithoutNullLines.matrix,
    matrixWithoutNullLines.positionXY,
    true
  );
  const optimal = optimalSolution(reference.matrix, reference.positionXY, undefined, true);
  const dualSolution = calcDualSolution("y", optimal);

  console.log("Result (test-1):", optimal);
  console.log("U results:", dualSolution);

  expect(toStrictEqual1Array(correctX, optimal.solution)).toBe(true);
  expect(toStrictEqual1Array(correctU, dualSolution)).toBe(true);
});

// test("calcDualSolution_test-2", () => {
//   const matrix = [
//     [-3, 1, 4, 1, 1],
//     [3, -2, 2, -2, -9],
//     [-2, 1, 1, 3, 2],
//     [-3, 2, -3, 0, 7],
//     [-10, 1, 42, 52, 0],
//   ];

//   const positionXY = {
//     top: ["x1", "x2", "x3", "x4"],
//     left: ["y1", "y2", "0", "0"],
//   };

//   const correctX = [9, 17, 0, 1];
//   const correctV = [0, 0, 0.5, 0];

//   const matrixWithoutNullLines = removeNullLines(matrix, positionXY);
//   const reference = referenceSolution(
//     matrixWithoutNullLines.matrix,
//     matrixWithoutNullLines.positionXY,
//   );
//   const optimal = optimalSolution(reference.matrix, reference.positionXY);
//   const dualSolution = calcDualSolution("x", optimal);

//   console.log("Result (test-2):", optimal);
//   console.log("V results:", dualSolution);

//   expect(toStrictEqual1Array(correctX, optimal.solution)).toBe(true);
//   expect(toStrictEqual1Array(correctV, dualSolution)).toBe(true);
// });

// test("calcDualSolution_test-v14", () => {
//   const matrix = [
//     [-1, -2, -4],
//     [1, 1, 3],
//     [-1, -1, 0],
//   ];

//   const positionXY = {
//     top: ["x1", "x2"],
//     left: ["0", "y1"],
//   };

//   const correctX = [2, 1];
//   const correctU = [1, 0];

//   const matrixWithoutNullLines = removeNullLines(matrix, positionXY);
//   const reference = referenceSolution(
//     matrixWithoutNullLines.matrix,
//     matrixWithoutNullLines.positionXY,
//     true
//   );
//   const optimal = optimalSolution(reference.matrix, reference.positionXY, undefined, true);
//   const dualSolution = calcDualSolution("y", optimal);

//   console.log("Result (test-v14):");
//   console.log("Optimal:", optimal);
//   console.log("Reference:", reference);
//   console.log("U results:", dualSolution);

//   expect(toStrictEqual1Array(correctX, optimal.solution)).toBe(true);
//   expect(toStrictEqual1Array(correctU, dualSolution)).toBe(true);
// });
