import calculateMatrixRank from "../functions/matrixRank";

test("matrix_rank_test-1", () => {
  const matrix = [
    [1, 2, 3, 4],
    [2, 4, 6, 8],
  ];

  const rank = 1;

  const result = calculateMatrixRank(matrix);
  expect(rank).toBe(result);
});

test("matrix_rank_test-2", () => {
  const matrix = [
    [2, 5, 4],
    [-3, 1, -2],
    [-1, 6, 2],
  ];

  const rank = 2;

  const result = calculateMatrixRank(matrix);
  expect(rank).toBe(result);
});

test("matrix_rank_test-3", () => {
  const matrix = [
    [1, 2],
    [3, 6],
    [5, 10],
    [4, 8],
  ];

  const rank = 1;

  const result = calculateMatrixRank(matrix);
  expect(rank).toBe(result);
});

test("matrix_rank_test-4", () => {
  const matrix = [
    [6, 2, 5],
    [-3, 4, -1],
    [1, 4, 3],
  ];

  const rank = 3;

  const result = calculateMatrixRank(matrix);
  expect(rank).toBe(result);
});

test("matrix_rank_test-5", () => {
  const matrix = [
    [-1, 5, 4],
    [-2, 7, 5],
    [3, 4, 1],
  ];

  const rank = 3;

  const result = calculateMatrixRank(matrix);
  expect(rank).toBe(result);
});

test("matrix_rank_test-6", () => {
  const matrix = [
    [1, 2, 3, 4],
    [-2, 5, -1, 3],
    [2, 4, 6, 8],
    [-1, 7, 2, 7],
  ];

  const rank = 2;

  const result = calculateMatrixRank(matrix);
  expect(rank).toBe(result);
});
