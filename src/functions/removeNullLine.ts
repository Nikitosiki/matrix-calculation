import modJordanStep from "./modJardanStep";
import { minimalPositive, positionXY } from "./referenceSolution";
import { deepCloneMatrix } from "./utils";

enum Result {
  Solved,
  ContradictoryRestrictions,
  NoSolve,
}

interface Solve {
  matrix: number[][] | null;
  result: Result;
  xyPos: positionXY;
}

export function removeNullLines(
  matrix: number[][],
  positionXY: positionXY,
): Solve {
  let newMatrix: number[][] = deepCloneMatrix(matrix);
  let xyPos: positionXY = {
    top: positionXY.top,
    left: positionXY.left,
  };

  while (true) {
    const rowIndex: number | null = findRowWithZero(xyPos.left);

    if (rowIndex === null) {
      return {
        matrix: newMatrix,
        result: Result.Solved,
        xyPos: xyPos,
      };
    }

    let currentColumn: number | null = null;
    for (let column = 0; column < newMatrix[rowIndex].length; column++) {
      if (newMatrix[rowIndex][column] > 0) {
          currentColumn = column;
          break;
      }
  }

    if (currentColumn === null) {
      return {
        matrix: newMatrix,
        result: Result.ContradictoryRestrictions,
        xyPos: xyPos,
      };
    }

    const minimalPositiveRow = minimalPositive(newMatrix, currentColumn)!;

    const result = modJordanStep(newMatrix, minimalPositiveRow, currentColumn);

    if (result === null) {
      return {
        matrix: null,
        result: Result.NoSolve,
        xyPos: xyPos,
      };
    }

    newMatrix = result;

    const temp1 = xyPos.top[currentColumn];
    const temp2 = xyPos.left[minimalPositiveRow];
    xyPos.left[minimalPositiveRow] = temp1;
    xyPos.top[currentColumn] = temp2;

    if (xyPos.top[currentColumn] === "0") {
      newMatrix = removeColumn(newMatrix, currentColumn);
      xyPos = {
        top: xyPos.top.filter((_, index) => index !== currentColumn),
        left: xyPos.left,
      };
    }
  }
}

function findRowWithZero(matrix: string[]): number | null {
  for (const [index, row] of matrix.entries()) {
    if (row === "0") {
      return index;
    }
  }
  return null;
}

function removeColumn(matrix: number[][], columnIndex: number): number[][] {
  return matrix.map(row =>
      row.filter((_, index) => index !== columnIndex)
  );
}