// import { printSimulation, printSimulationResult, simulateMatrixGame } from "../functions/gameSimulation";
import { solveMatrixGame } from "../functions/gameSolution";
import { toStrictEqual1Array } from "./toStrictEqualArray";

test("gameSolution_test-v14-A1", () => {
  const matrix = [
    [5, 3, -6],
    [3, 5, -1],
    [-1, -2, -3],
  ];

  const positionXY = {
    top: ["x1", "x2", "x3"],
    left: ["y1", "y2", "y3"],
  };

  const correctFirstPlayer = [0, 1, 0];
  const correctSecondPlayer = [0, 0, 1];

  const solution = solveMatrixGame(matrix, positionXY)

  // console.log("Result (test-v14-A1):");
  // console.log("First player:", solution.firstPlayersSolution);
  // console.log("Second player:", solution.secondPlayersSolution);
  // console.log("Solution:", solution);

  // const simulationResult = simulateMatrixGame(
  //   matrix,
  //   solution.firstPlayersSolution,
  //   solution.secondPlayersSolution
  // )
  // printSimulation(simulationResult, positionXY)
  // printSimulationResult(simulationResult, positionXY)

  expect(true).toBe(true);
  expect(toStrictEqual1Array(correctFirstPlayer, solution.firstPlayersSolution)).toBe(true);
  expect(toStrictEqual1Array(correctSecondPlayer, solution.secondPlayersSolution)).toBe(true);
});

test("gameSolution_test-v14-A2", () => {
  const matrix = [
    [12, 18],
    [14, 8],
  ];

  const positionXY = {
    top: ["x1", "x2"],
    left: ["y1", "y2"],
  };

  const correctFirstPlayer = [0.49, 0.49];
  const correctSecondPlayer = [0.83, 0.17];

  const solution = solveMatrixGame(matrix, positionXY)

  // console.log("Result (test-v14-A2):");
  // console.log("First player:", solution.firstPlayersSolution);
  // console.log("Second player:", solution.secondPlayersSolution);
  // console.log("Solution:", solution);
  
  // const simulationResult = simulateMatrixGame(
  //   matrix,
  //   solution.firstPlayersSolution,
  //   solution.secondPlayersSolution
  // )
  // printSimulation(simulationResult, positionXY)
  // printSimulationResult(simulationResult, positionXY)

  expect(toStrictEqual1Array(correctFirstPlayer, solution.firstPlayersSolution)).toBe(true);
  expect(toStrictEqual1Array(correctSecondPlayer, solution.secondPlayersSolution)).toBe(true);
});

test("gameSolution_test-1", () => {
  const matrix = [
    [5, 2, 7],
    [1, 4, 3],
    [6, 1, 5],
  ];

  const positionXY = {
    top: ["x1", "x2", "x3"],
    left: ["y1", "y2", "y3"],
  };

  const correctFirstPlayer = [0.5, 0.5, 0];
  const correctSecondPlayer = [0.33, 0.67, 0];

  const solution = solveMatrixGame(matrix, positionXY)

  // console.log("Result (test-1):");
  // console.log("First player:", solution.firstPlayersSolution);
  // console.log("Second player:", solution.secondPlayersSolution);

  expect(toStrictEqual1Array(correctFirstPlayer, solution.firstPlayersSolution)).toBe(true);
  expect(toStrictEqual1Array(correctSecondPlayer, solution.secondPlayersSolution)).toBe(true);
});

test("gameSolution_test-2", () => {
  const matrix = [
    [2, -1, 3, 3],
    [-1, 2, 2, 7],
    [1, 1, 1, 2],
  ];

  const positionXY = {
    top: ["x1", "x2", "x3", "x4"],
    left: ["y1", "y2", "y3"],
  };

  const correctFirstPlayer = [0, 0, 1];
  const correctSecondPlayer = [0.67, 0.33, 0];

  const solution = solveMatrixGame(matrix, positionXY)

  // console.log("Result (test-2):");
  // console.log("First player:", solution.firstPlayersSolution);
  // console.log("Second player:", solution.secondPlayersSolution);

  expect(toStrictEqual1Array(correctFirstPlayer, solution.firstPlayersSolution)).toBe(true);
  expect(toStrictEqual1Array(correctSecondPlayer, solution.secondPlayersSolution)).toBe(true);
});

test("gameSolution_test-3", () => {
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

  // console.log("Result (test-3):");
  // console.log("First player:", solution.firstPlayersSolution);
  // console.log("Second player:", solution.secondPlayersSolution);

  expect(toStrictEqual1Array(correctFirstPlayer, solution.firstPlayersSolution)).toBe(true);
  expect(toStrictEqual1Array(correctSecondPlayer, solution.secondPlayersSolution)).toBe(true);
});
