import { isSquareMatrix } from "./utils";

function inverseMatrix(matrix: number[][]): number[][] | null {
  const n = matrix.length;

  if (!isSquareMatrix(matrix)) {
    return null;
  }

  const identityMatrix: number[][] = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
  );

  const augmentedMatrix: number[][] = matrix.map((row) => [
    ...row,
    ...identityMatrix[matrix.indexOf(row)],
  ]);

  for (let i = 0; i < n; i++) {
    const pivot = augmentedMatrix[i][i];

    if (pivot === 0) {
      return null;
    }

    for (let j = 0; j < 2 * n; j++) {
      augmentedMatrix[i][j] /= pivot;
    }

    for (let k = 0; k < n; k++) {
      if (k !== i) {
        const factor = augmentedMatrix[k][i];
        for (let j = 0; j < 2 * n; j++) {
          augmentedMatrix[k][j] -= factor * augmentedMatrix[i][j];
        }
      }
    }
  }

  const inverse: number[][] = augmentedMatrix.map((row) => row.slice(n));
  return inverse;
}

export default inverseMatrix;
