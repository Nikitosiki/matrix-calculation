import modJordanStep from "./modJardanStep";
import { minimalPositive, positionXY } from "./referenceSolution";
import { deepCloneMatrix, roundedMatrix } from "./utils";

export interface solutionResult {
  matrix: number[][];
  positionXY: positionXY;
  log: string;
}

export function removeNullLines(
  matrix: number[][],
  positionXY: positionXY,
): solutionResult {
  const ret: solutionResult = {
    matrix: deepCloneMatrix(matrix),
    positionXY: positionXY,
    log: "This is strange",
  };

  const last = (log: string) => {
    ret.matrix = roundedMatrix(ret.matrix);
    ret.log = log;
    return ret;
  };

  if (ret.matrix.length < 2 || ret.matrix[0].length < 2) {
    return last("The matrix size is incorrect");
  }

  // eslint-disable-next-line no-constant-condition
  for (let index = 0; index < 9999; index++) {
    const rowIndex: number | null = findRowWithZero(ret.positionXY.left);

    if (rowIndex === null) {
      // Розвёязок вже знайдено
      return last("A reference solution has already been found");
    }

    let currentColumn: number | null = null;
    for (let column = 0; column < ret.matrix[rowIndex].length; column++) {
      if (ret.matrix[rowIndex][column] > 0) {
          currentColumn = column;
          break;
      }
  }

    if (currentColumn === null) {
      // Я не думав, що це колись станеться
      return last("I didn't think this would ever happen");
    }

    const minimalPositiveRow = minimalPositive(ret.matrix, currentColumn)!;

    const result = modJordanStep(ret.matrix, minimalPositiveRow, currentColumn);

    if (result === null) {
      // Немає рішення
      return last("This can't be solved");
    }

    ret.matrix = result;

    const temp1 = ret.positionXY.top[currentColumn];
    const temp2 = ret.positionXY.left[minimalPositiveRow];
    ret.positionXY.left[minimalPositiveRow] = temp1;
    ret.positionXY.top[currentColumn] = temp2;

    if (ret.positionXY.top[currentColumn] === "0") {
      ret.matrix = removeColumn(ret.matrix, currentColumn);
      ret.positionXY = {
        top: ret.positionXY.top.filter((_, index) => index !== currentColumn),
        left: ret.positionXY.left,
      };
    }
  }

  return last("I think I'm broken");
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