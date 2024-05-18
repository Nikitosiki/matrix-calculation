import { solveAssignmentProblem } from "../functions/assignmentSolution";
import { optimalSolution } from "../functions/optimalSolution";
import { referenceSolution } from "../functions/referenceSolution";

test("transportSolution_test-1", () => {
  const matrix = [
    [2, 4, 1, 3, 3],
    [1, 5, 4, 1, 2],
    [3, 5, 2, 2, 4],
    [1, 4, 3, 1, 4],
    [3, 2, 5, 3, 5],
  ];

  const expectedCost = 8;

  const result = solveAssignmentProblem(matrix);

  console.log("Result (test-1):");
  console.log("Assignments matrix: ", result.assignments);
  console.log("Cost by matrix: ", result.cost);

  expect(result.cost).toBe(expectedCost);
});

test("transportSolution_test-2", () => {
  const matrix = [
    [2, 10, 9, 7],
    [15, 4, 14, 8],
    [13, 14, 16, 11],
    [4, 15, 13, 19],
  ];

  const expectedCost = 28;

  const result = solveAssignmentProblem(matrix);

  console.log("Result (test-2):");
  console.log("Assignments matrix: ", result.assignments);
  console.log("Cost by matrix: ", result.cost);

  expect(result.cost).toBe(expectedCost);
});

test("transportSolution_test-v14", () => {
  const matrix = [
    [11, 12, 8, 10],
    [19, 22, 24, 16],
    [27, 23, 17, 22],
    [15, 13, 18, 21],
  ];

  const expectedCost = 57;

  const result = solveAssignmentProblem(matrix);

  console.log("Result (test-v14):");
  console.log("Assignments matrix: ", result.assignments);
  console.log("Cost by matrix: ", result.cost);

  expect(result.cost).toBe(expectedCost);
});

// ----------------------------------------------------------------

test("transportSolution_test-simplex-1", () => {
  const matrix = [
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [-1, 0, 0, 0, -1, 0, 0, 0, -1, 0, 0, 0, -1, 0, 0, 0, -1],
    [0, -1, 0, 0, 0, -1, 0, 0, 0, -1, 0, 0, 0, -1, 0, 0, -1],
    [0, 0, -1, 0, 0, 0, -1, 0, 0, 0, -1, 0, 0, 0, -1, 0, -1],
    [0, 0, 0, -1, 0, 0, 0, -1, 0, 0, 0, -1, 0, 0, 0, -1, -1],
    [2, 10, 9, 7, 15, 4, 14, 8, 13, 14, 16, 11, 4, 15, 13, 19, 0]
];

  const expectedCost = 28;

  const xy = {
    top: [
      "x1",
      "x2",
      "x3",
      "x4",
      "x5",
      "x6",
      "x7",
      "x8",
      "x9",
      "x10",
      "x11",
      "x12",
      "x13",
      "x14",
      "x15",
      "x16",
    ],
    left: ["y1", "y2", "y3", "y4", "y5", "y6", "y7", "y8"],
  };

  const reference = referenceSolution(matrix!, xy);
  const optimal = optimalSolution(reference.matrix!, reference.positionXY);
  const cost = Math.abs(optimal.matrix.slice(-1)[0].slice(-1)[0]);

  console.log("Result (test-simplex-1):");
  console.log("Reference: ", reference.matrix);
  console.log("Optimal: ", optimal.matrix);
  console.log("Cost by matrix: ", cost);

  expect(cost).toBe(expectedCost);
});

test("transportSolution_test-simplex-v14", () => {
  const matrix = [
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [-1, 0, 0, 0, -1, 0, 0, 0, -1, 0, 0, 0, -1, 0, 0, 0, -1],
    [0, -1, 0, 0, 0, -1, 0, 0, 0, -1, 0, 0, 0, -1, 0, 0, -1],
    [0, 0, -1, 0, 0, 0, -1, 0, 0, 0, -1, 0, 0, 0, -1, 0, -1],
    [0, 0, 0, -1, 0, 0, 0, -1, 0, 0, 0, -1, 0, 0, 0, -1, -1],
    [11, 12, 8, 10, 19, 22, 24, 16, 27, 23, 17, 22, 15, 13, 18, 21, 0],
  ];

  const expectedCost = 57;

  const xy = {
    top: [
      "x1",
      "x2",
      "x3",
      "x4",
      "x5",
      "x6",
      "x7",
      "x8",
      "x9",
      "x10",
      "x11",
      "x12",
      "x13",
      "x14",
      "x15",
      "x16",
    ],
    left: ["y1", "y2", "y3", "y4", "y5", "y6", "y7", "y8"],
  };

  const reference = referenceSolution(matrix!, xy);
  const optimal = optimalSolution(reference.matrix!, reference.positionXY);
  const cost = Math.abs(optimal.matrix.slice(-1)[0].slice(-1)[0]);

  console.log("Result (test-simplex-1):");
  console.log("Reference: ", reference.matrix);
  console.log("Optimal: ", optimal.matrix);
  console.log("Cost by matrix: ", cost);

  expect(cost).toBe(expectedCost);
});
