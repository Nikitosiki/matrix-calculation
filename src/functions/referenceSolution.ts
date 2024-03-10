import modJordanStep from "./modJardanStep";
import { roundedMatrix } from "./utils";

export interface positionXY {
  top: string[];
  left: string[];
}

export interface referenceSolutionResult {
  matrix: number[][];
  positionXY: positionXY;
  solution: number[];
  log: string;
}

export const genPositionXY = (countX: number, countY: number): positionXY => {
  const position: positionXY = {
    top: [],
    left: [],
  };

  for (let i = 1; i <= countX; i++) {
    position.top.push(`x${i}`);
  }

  for (let j = 1; j <= countY; j++) {
    position.left.push(`y${j}`);
  }

  return position;
};

export function referenceSolution(
  matrix: number[][],
  positionXY?: positionXY,
): referenceSolutionResult {
  const ret: referenceSolutionResult = {
    matrix: matrix,
    positionXY: {
      top: [],
      left: [],
    },
    solution: [],
    log: "This is strange",
  };

  ret.positionXY = positionXY
    ? positionXY
    : genPositionXY(ret.matrix[0].length - 1, ret.matrix.length - 1);

  const last = (log: string) => {
    ret.matrix = roundedMatrix(ret.matrix);
    ret.log = log;
    calcSolution(ret);
    return ret;
  };

  if (ret.matrix.length < 2 || ret.matrix[0].length < 2) {
    return last("The matrix size is incorrect");
  }

  // eslint-disable-next-line no-constant-condition
  for (let index = 0; index < 9999; index++) {
    const rowNumber = searchForNegativeElement(getSingle(ret.matrix));
    if (rowNumber === null) {
      // Опорний розвёязок вже знайдено
      return last("A reference solution has already been found");
    }

    // Серед коефіцієнтів цього рядка знаходимо перший від’ємний
    const colNumber = searchForNegativeElement(ret.matrix[rowNumber]);
    if (colNumber === null) {
      // Система обмежень викликає суперечки
      return last("The restrictions system is controversial");
    }

    const rowNumberMinimalPositive = minimalPositive(ret.matrix, colNumber);
    if (rowNumberMinimalPositive === null) {
      return last("The minimum positive element was not found");
    }

    ret.matrix = modJordanStep(ret.matrix, rowNumberMinimalPositive, colNumber);

    const temp1 = ret.positionXY.top[colNumber];
    const temp2 = ret.positionXY.left[rowNumberMinimalPositive];
    ret.positionXY.left[rowNumberMinimalPositive] = temp1;
    ret.positionXY.top[colNumber] = temp2;
  }

  return last("I think I'm broken");
}

export const calcSolution = (val: referenceSolutionResult) => {
  const solution: number[] = [];

  for (let i = 1; i <= val.matrix[0].length - 1; i++) {
    solution.push(0);
  }

  // val.positionXY.left.forEach((element) => {
  //   if (element.charAt(0) === "x") {
  //     const index = Number(element.charAt(1));
  //     solution[index - 1] = val.matrix[index][val.matrix[index - 1].length - 1];
  //   }
  // });

  val.positionXY.left.forEach((row, index) => {
    if (row.startsWith("x")) {
      const digitAfterX = row.substring(1);
      try {
        const result = parseInt(digitAfterX, 10);
        solution[result - 1] = val.matrix?.[index]?.slice(-1)[0] ?? 0;
      } catch (e) {
        console.log("Ouch");
      }
    }
  });

  val.solution = solution;
};

const getSingle = (matrix: number[][]): number[] =>
  matrix.map((val) => val[val.length - 1]).slice(0, -1);
//const getZ = (matrix: number[][]): number[] => matrix[matrix.length - 1].slice(0, -1);

// Пошук від'ємного елемента в масиві
/**
 * @returns {number | null} Индекс найденого елемента в массиве
 */
function searchForNegativeElement(array: number[]): number | null {
  const index = array.findIndex((val) => val < 0);
  return index !== -1 ? index : null;
}

// Мінімальне невід'ємне (МНВ)
/**
 * @returns {number | null} Индекс найденой строки
 */
export function minimalPositive(matrix: number[][], colNumber: number): number | null {
  if (colNumber < 0 || colNumber >= matrix[0].length) {
    return null;
  }

  let minimalPositiveIndex: number | null = null;
  let minimalPositiveValue = Number.MAX_VALUE;

  for (let row = 0; row < matrix.length - 1; row++) {
    if (matrix[row][colNumber] === 0) continue;
    if (matrix[row][matrix[row].length - 1] === 0 && matrix[row][colNumber] < 0)
      continue;

    const currentValue =
      matrix[row][matrix[row].length - 1] / matrix[row][colNumber];
    if (currentValue < 0) continue;
    if (currentValue < minimalPositiveValue) {
      minimalPositiveIndex = row;
      minimalPositiveValue = currentValue;
    }
  }

  return minimalPositiveIndex;
}
