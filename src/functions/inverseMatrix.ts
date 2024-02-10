import { isSquareMatrix } from "./utils";

// Пошук оберненої матриці для довільної квадратної матриці
function inverseMatrix(matrix: number[][]): number[][] | null {
  const n = matrix.length;

  // Перевірка, чи матриця є квадратною
  if (!isSquareMatrix(matrix)) {
    return null;
  }

  // Створення одиничної матриці
  const identityMatrix: number[][] = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
  );

  // Копія вхідної матриці для уникнення змін у вхідних даних
  const augmentedMatrix: number[][] = matrix.map((row) => [
    ...row,
    ...identityMatrix[matrix.indexOf(row)],
  ]);

  for (let i = 0; i < n; i++) {
    const pivot = augmentedMatrix[i][i];

    if (pivot === 0) {
      return null; // Матриця не має оберненої матриці
    }

    // Кроки Звичайних Жорданових виключень
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

  // Витягнення оберненої матриці з розширеної матриці
  const inverse: number[][] = augmentedMatrix.map((row) => row.slice(n));

  return inverse;
}

export default inverseMatrix;
