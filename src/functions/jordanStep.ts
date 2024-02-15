import { deepCloneMatrix } from "./utils";

function jordanStep(matrix: number[][], stepIndex: number): number[][] {
  const matrixClone: number[][] = deepCloneMatrix(matrix);

  matrixClone[stepIndex] = matrixClone[stepIndex].map((val) => -val);
  matrixClone[stepIndex][stepIndex] = 1;

  matrix.forEach((row, indexR) => {
    row.forEach((_, indexC) => {
      if (indexR !== stepIndex && indexC !== stepIndex)
        matrixClone[indexR][indexC] =
          matrix[indexR][indexC] * matrix[stepIndex][stepIndex] -
          matrix[indexR][stepIndex] * matrix[stepIndex][indexC];
    });
  });

  return matrixClone.map((row) =>
    row.map((val) => val / matrix[stepIndex][stepIndex]),
  );
}

export default jordanStep;
