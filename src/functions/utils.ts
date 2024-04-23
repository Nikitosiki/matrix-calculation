export function deepCloneMatrix<T>(array: T[][]): T[][] {
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

export function getMatrixWithoutName(
  namedMatrix: (number | string)[][],
): number[][] | null {
  if (namedMatrix.length < 1 || namedMatrix[0].length < 1) {
    return null;
  }

  for (let row = 0; row < namedMatrix.length; row++) {
    for (let col = 0; col < namedMatrix[row].length; col++) {
      if (typeof namedMatrix[row][col] !== "number") {
        return null;
      }
    }
  }

  const processedMatrix: number[][] = namedMatrix
    .slice(1)
    .map((row) => row.slice(1).map((element) => Number(element)));

  return processedMatrix;
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
