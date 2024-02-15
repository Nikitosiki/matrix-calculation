import inverseMatrix from "./inverseMatrix";

function solveLinearSystem(
  matrix: number[][],
  constants: number[],
): number[] | null {
  const n = matrix.length;

  const inverse = inverseMatrix(matrix);

  if (!inverse) {
    return null;
  }

  const solution: number[] = [];
  for (let i = 0; i < n; i++) {
    let sum = 0;
    for (let j = 0; j < n; j++) {
      sum += inverse[i][j] * constants[j];
    }
    solution.push(sum);
  }

  return solution;
}

export default solveLinearSystem;
