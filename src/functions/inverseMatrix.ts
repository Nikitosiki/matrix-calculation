import jordanStep from "./jordanStep";
import { isSquareMatrix } from "./utils";

function inverseMatrix(matrix: number[][]): number[][] | null {
  if (!isSquareMatrix(matrix)) {
    return null;
  }

  matrix.forEach((_, index) => {
    matrix = jordanStep(matrix, index);
  });

  return matrix;
}

export default inverseMatrix;
