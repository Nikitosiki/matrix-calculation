import jordanStep from "./jordanStep";
import { isSquareMatrix } from "./utils";

function inverseMatrix(matrix: number[][]): number[][] | null {
  if (!isSquareMatrix(matrix)) {
    return null;
  }

  for (let index = 0; index < matrix.length; index++) {
    if (matrix[index][index] === 0) return null;
    matrix = jordanStep(matrix, index);
  }

  return matrix;
}

export default inverseMatrix;
