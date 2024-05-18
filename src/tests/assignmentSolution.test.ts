import { solveAssignmentProblem } from "../functions/assignmentSolution";

test("transportSolution_test-1", () => {
  const matrix = [
    [2, 4, 1, 3, 3],
    [1, 5, 4, 1, 2],
    [3, 5, 2, 2, 4],
    [1, 4, 3, 1, 4],
    [3, 2, 5, 3, 5],
  ];

  const expectedCost = 8

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

  const expectedCost = 28

  const result = solveAssignmentProblem(matrix);

  console.log("Result (test-2):");
  console.log("Assignments matrix: ", result.assignments);
  console.log("Cost by matrix: ", result.cost);

  expect(result.cost).toBe(expectedCost);
});
