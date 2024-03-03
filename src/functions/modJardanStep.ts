import { deepCloneMatrix } from "./utils";


function modJordanStep(matrix: number[][], stepIndex: number): number[][];
function modJordanStep(matrix: number[][], rowIndex: number, colIndex: number): number[][];

function modJordanStep(matrix: number[][], rowIndex: number, colIndex: number = rowIndex): number[][] {
  const matrixClone: number[][] = deepCloneMatrix(matrix);

  matrixClone.forEach(row => row[colIndex] = -row[colIndex]);
  matrixClone[rowIndex][colIndex] = 1;

  matrix.forEach((row, indexR) => {
    row.forEach((_, indexC) => {
      if (indexR !== rowIndex && indexC !== colIndex)
        matrixClone[indexR][indexC] =
          matrix[indexR][indexC] * matrix[rowIndex][colIndex] -
          matrix[indexR][colIndex] * matrix[rowIndex][indexC];
    });
  });

  return matrixClone.map((row) =>
    row.map((val) => val / matrix[rowIndex][colIndex]),
  );
}


export default modJordanStep;