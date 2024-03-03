import { referenceSolution } from "../functions/referenceSolution";

test("reference_solution_test-1", () => {
  const matrix = [
    [1, 1, -1, -2, 6],
    [-1, -1, -1, 1, -5],
    [2, -1, 3, 4, 10],
    [-1, -2, 1, 1, 0],
  ];

  console.log("Search for a reference junction:", referenceSolution(matrix));
});
