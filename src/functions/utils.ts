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

export function addRow(matrix: number[][], rowIndex: number, newRow: number[]): number[][] {
  if (rowIndex < 0 || rowIndex > matrix.length) {
      throw new Error("Invalid rowIndex");
  }
  if (newRow.length !== matrix[0].length) {
      throw new Error("New row size must match the matrix column count");
  }

  const result: number[][] = [];

  for (let i = 0; i < rowIndex; i++) {
      result.push(matrix[i]);
  }

  result.push(newRow);

  for (let i = rowIndex; i < matrix.length; i++) {
      result.push(matrix[i]);
  }

  return result;
}

export function addValueAtPosition(array: string[], position: number, value: string): string[] {
  // console.log("вфывфывфыв", array, position, value);
  if (position < 0 || position > array.length) {
      throw new Error("Invalid position");
  }

  const resultArray: string[] = Array(array.length + 1).fill("");

  for (let i = 0; i < position; i++) {
      resultArray[i] = array[i];
  }

  resultArray[position] = value;

  for (let i = position; i < array.length; i++) {
      resultArray[i + 1] = array[i];
  }

  // console.log("вфы123231кувфывфыв", resultArray);
  return resultArray;
}
