export function deepCloneMatrix(array: number[][]): number[][] {
  return array.map((row) => row.slice());
}

export function isSquareMatrix(matrix: number[][]): boolean {
  const rows = matrix.length;
  if (rows === 0) {
    return false;
  }

  for (const row of matrix) {
    if (row.length !== rows) {
      return false;
    }
  }

  return true;
}

export function roundedRow(row: number[]) {
  return row.map((value) => {
    const res = Math.round(value * 1000) / 1000;
    if (Object.is(res, -0)) return 0;
    else return res;
  });
}

export function roundedMatrix(matrix: number[][]): number[][] {
  return matrix.map((value) => roundedRow(value));
}

export function printMatrix(matrix: number[][]): void {
  for (const row of matrix) {
    console.log(roundedRow(row).join("\t"));
  }
}
