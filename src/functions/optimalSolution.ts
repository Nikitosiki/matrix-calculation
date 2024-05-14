import modJordanStep from "./modJardanStep";
import { calcSolution, minimalPositive, positionXY, referenceSolutionResult } from "./referenceSolution";
import { roundedMatrix } from "./utils";

export function optimalSolution(
  matrix: number[][],
  positionXY: positionXY,
  searchMinimum: boolean = false,
  isLog: boolean = false
): referenceSolutionResult {
  const ret: referenceSolutionResult = {
    matrix: matrix,
    positionXY: positionXY,
    solution: [],
    log: "This is strange",
  };

  const isNegative = (value: number) => (searchMinimum ? value > 0 : value < 0);

  const last = (log: string) => {
    ret.matrix = roundedMatrix(ret.matrix)
    ret.log = log;
    calcSolution(ret);
    return ret;
  };

  // eslint-disable-next-line no-constant-condition
  for (let index = 0; index < 9999; index++) {
    isLog && console.log(`Optimal ${index}:`, ret);

    let colNumberNegativeZElement = -1;
    const zValues = ret.matrix[ret.matrix.length - 1].slice(0, -1);

    for (let i = 0; i < zValues.length; i++) {
      if (isNegative(zValues[i])) {
        colNumberNegativeZElement = i;
        break;
      }
    }

    if (colNumberNegativeZElement < 0) {
      return last("A optional solution has already been found");
    }

    const rowNumberMinimalPositive = minimalPositive(ret.matrix, colNumberNegativeZElement)

    if (rowNumberMinimalPositive === null) {
      return last(searchMinimum ? "It seems we have no lower limit" : "It seems we have no upper limit");
    }

    ret.matrix = modJordanStep(ret.matrix, rowNumberMinimalPositive, colNumberNegativeZElement);

    if (!ret.matrix) {
      return last("Problem, no solution")
    }

    const temp1 = ret.positionXY.top[colNumberNegativeZElement];
    const temp2 = ret.positionXY.left[rowNumberMinimalPositive];
    ret.positionXY.left[rowNumberMinimalPositive] = temp1;
    ret.positionXY.top[colNumberNegativeZElement] = temp2;
  }

  return last("I think I'm broken");
}
