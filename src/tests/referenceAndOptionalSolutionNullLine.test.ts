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

  const positionXY: positionXY = {
    top: ["x1", "x2", "x3", "x4"],
    left: ["0", "0", "y1", "y2"]
  };

  const matrixWithoutNullLines = removeNullLines(matrix, positionXY);
  console.log("Matrix without null lines:", matrixWithoutNullLines);

  const matrixReference = referenceSolution(matrixWithoutNullLines.matrix ?? [], matrixWithoutNullLines.xyPos);
  console.log("Search for a reference junction:", matrixReference);

  const matrixOptimal = optimalSolution(matrixReference.matrix, matrixReference.positionXY);
  console.log("Search for a optional junction:", matrixOptimal);

  expect(toStrictEqual2Array(correctWithoutNullLines, matrixWithoutNullLines.matrix ?? [])).toBe(true);
  expect(toStrictEqual2Array(correctReference, matrixReference.matrix)).toBe(true);
  expect(toStrictEqual2Array(correctOptimal, matrixOptimal.matrix)).toBe(true);
});
