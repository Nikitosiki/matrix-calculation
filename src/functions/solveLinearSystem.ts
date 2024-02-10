import inverseMatrix from "./inverseMatrix";

function solveLinearSystem(matrix: number[][], constants: number[]): number[] | null {
  const n = matrix.length;

  // Обчислення оберненої матриці
  const inverse = inverseMatrix(matrix);

  if (!inverse) {
    return null;
  }

  // Обчислення вектора розв'язку
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