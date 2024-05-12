import { solveMatrixGame } from "../functions/gameSolution";
import { toStrictEqual1Array } from "./toStrictEqualArray";

test("gameSolution_test-1", () => {
  const matrix = [
    [5, 2, 3, 7],
    [3, 1, 4, 2],
    [4, 3, 5, 6],
  ];

  const positionXY = {
    top: ["x1", "x2", "x3", "x4"],
    left: ["y1", "y2", "y3"],
  };

  const correctFirstPlayer = [0, 0, 1];
  const correctSecondPlayer = [0, 1, 0, 0];

  const solution = solveMatrixGame(matrix, positionXY)

  console.log("Result (test-1):");
  console.log("First player:", solution.firstPlayersSolution);
  console.log("Second player:", solution.secondPlayersSolution);

  expect(toStrictEqual1Array(correctFirstPlayer, solution.firstPlayersSolution)).toBe(true);
  expect(toStrictEqual1Array(correctSecondPlayer, solution.secondPlayersSolution)).toBe(true);
});