import { optimalSolution } from "../functions/optimalSolution";
import { positionXY, referenceSolution } from "../functions/referenceSolution";
import { removeNullLines } from "../functions/removeNullLine";
import { toStrictEqual2Array } from "./toStrictEqualArray";

test("test-1", () => {
  const matrix = [
    [-2, 1, 1, 3, 2],
    [-3, 2, -3, 0, 7],
    [-3, 1, 4, 1, 1],
    [3, -2, 2, -2, -9],
    [-10, 1, 42, 52, 0],
  ];

  const positionXY: positionXY = {
    top: ["x1", "x2", "x3", "x4"],
    left: ["0", "0", "y1", "y2"]
  };

  const correctWithoutNullLines: number[][] = [
    [-5, -6, 3],
    [-2, -8, 2],
    [-9, -9, 8],
    [-1, -2, -2],
    [1, 1, 22],
  ];

  const correctReference: number[][] = [
    [-5, 4, 13],
    [-2, -4, 6],
    [-9, 9, 26],
    [-1, 2, 2],
    [1, -1, 20]
  ];

  const correctOptimal: number[][] = [
    [-3, -2, 9],
    [-4, 2, 10],
    [-4.5, -4.5, 17],
    [-0.5, 0.5, 1],
    [0.5, 0.5, 21]
  ];

  const matrixWithoutNullLines = removeNullLines(matrix, positionXY);
  // console.log("Matrix without null lines:", matrixWithoutNullLines);

  const matrixReference = referenceSolution(matrixWithoutNullLines.matrix ?? [], matrixWithoutNullLines.positionXY);
  // console.log("Search for a reference junction:", matrixReference);

  const matrixOptimal = optimalSolution(matrixReference.matrix, matrixReference.positionXY);
  // console.log("Search for a optional junction:", matrixOptimal);

  expect(toStrictEqual2Array(correctWithoutNullLines, matrixWithoutNullLines.matrix ?? [])).toBe(true);
  expect(toStrictEqual2Array(correctReference, matrixReference.matrix)).toBe(true);
  expect(toStrictEqual2Array(correctOptimal, matrixOptimal.matrix)).toBe(true);
});

test("test-1-14", () => {
  const matrix = [
    [1, 1, 1, 1, 1, 3, 4],
    [1, -4, 0, 1, 10, -1, 5],
    [-1, -3, -7, -1, -15, 1, -2],
    [-1, -2, 1, 1, 0, -1, 0],
  ];

  const positionXY: positionXY = {
    top: ["x1", "x2", "x3", "x4", "x5", "x6"],
    left: ["0", "y1", "y2"]
  };

  const correctWithoutNullLines: number[][] = [
    [ -2, -6, 0, -14, 4, 2 ],
    [ -5, -1, 0, 9, -4, 1 ],
    [ 1, 1, 1, 1, 3, 4 ],
    [ -1, 2, 2, 1, 2, 4 ]
  ];

  const correctReference: number[][] = [
    [ -2, -6, 0, -14, 4, 2 ],
    [ -5, -1, 0, 9, -4, 1 ],
    [ 1, 1, 1, 1, 3, 4 ],
    [ -1, 2, 2, 1, 2, 4 ]
  ];

  const correctOptimal: number[][] = [
    [ 2, -4, 2, -12, 10, 10 ],
    [ 5, 4, 5, 14, 11, 21 ],
    [ 1, 1, 1, 1, 3, 4 ],
    [ 1, 3, 3, 2, 5, 8 ]
  ];

  const matrixWithoutNullLines = removeNullLines(matrix, positionXY);
  // console.log("Matrix without null lines:", matrixWithoutNullLines);

  const matrixReference = referenceSolution(matrixWithoutNullLines.matrix ?? [], matrixWithoutNullLines.positionXY);
  // console.log("Search for a reference junction:", matrixReference);

  const matrixOptimal = optimalSolution(matrixReference.matrix, matrixReference.positionXY);
  // console.log("Search for a optional junction:", matrixOptimal);

  expect(toStrictEqual2Array(correctWithoutNullLines, matrixWithoutNullLines.matrix ?? [])).toBe(true);
  expect(toStrictEqual2Array(correctReference, matrixReference.matrix)).toBe(true);
  expect(toStrictEqual2Array(correctOptimal, matrixOptimal.matrix)).toBe(true);
});