import modJordanStep from "./modJardanStep";

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

const genPositionXY = (countX: number, countY: number): positionXY => {
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

  ret.positionXY = positionXY ? positionXY : genPositionXY(ret.matrix[0].length - 1, ret.matrix.length - 1);

  const last = (log: string) => {
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

const calcSolution = (val: referenceSolutionResult) => {
  const solution: number[] = [];

  for (let i = 1; i <= val.matrix[0].length - 1; i++) {
    solution.push(0);
  }

  val.positionXY.left.forEach((element) => {
    if (element.charAt(0) === "x") {
      const index = Number(element.charAt(1));
      solution[index - 1] = val.matrix[index][val.matrix[index].length - 1];
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
function minimalPositive(matrix: number[][], colNumber: number): number | null {
  if (colNumber < 0 || colNumber >= matrix[0].length) {
    return null;
  }

  let minimalPositiveValue: number | null = null;

  for (let row = 0; row < matrix.length; row++) {
    const currentValue = matrix[row][colNumber];

    if (
      currentValue >= 0 &&
      (minimalPositiveValue === null || currentValue < minimalPositiveValue)
    ) {
      minimalPositiveValue = currentValue;
    }
  }

  return minimalPositiveValue;
}
