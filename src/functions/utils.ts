// Проверка квадратной ли матрица
export function isSquareMatrix(matrix: number[][]): boolean {
  const rows = matrix.length;
  if (rows === 0) {
    return false; // Пустая матрица не считается квадратной
  }

  for (const row of matrix) {
    if (row.length !== rows) {
      return false; // Если хотя бы одна строка не имеет той же длины, что и количество строк, то это не квадратная матрица
    }
  }

  return true;
}

// Виведення матриці
export function printMatrix(matrix: number[][]): void {
  for (const row of matrix) {
    console.log(roundedRow(row).join("\t"));
  }
}

export function roundedRow(row: number[]) {
  return row.map((value) => Math.round(value * 1000) / 1000);
}