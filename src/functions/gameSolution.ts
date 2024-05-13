import {
  addColumnPlaceholder,
  addRowPlaceholder,
  deepCloneMatrix,
  roundedRow,
} from "./utils";
import {
  positionXY,
  referenceSolution,
  referenceSolutionResult,
} from "./referenceSolution";
import { optimalSolution } from "./optimalSolution";

interface PlayersSolution {
  firstPlayersSolution: number[];
  secondPlayersSolution: number[];
}

interface MatrixGameSolution extends PlayersSolution {
  outputMatrix: number[][];
  positionXY: positionXY;
  gamePrice: number;
  strategyType: StrategiesType;
}

enum StrategiesType {
  PureStrategies,
  MixedStrategies,
  Undefined,
}

export function solveMatrixGame(
  matrix: number[][],
  positionXY: positionXY,
): MatrixGameSolution {
  const minGamePrice = findMinGamePrice(matrix);
  const maxGamePrice = findMaxGamePrice(matrix);

  const result =
    minGamePrice === maxGamePrice
      ? findSolveInPureStrategies(matrix, positionXY)
      : findSolveInMixedStrategies(matrix, positionXY);

  result.firstPlayersSolution = roundedRow(result.firstPlayersSolution, 100);
  result.secondPlayersSolution = roundedRow(result.secondPlayersSolution, 100);

  return result;
}

function findSolveInMixedStrategies(
  matrix: number[][],
  positionXY: positionXY,
): MatrixGameSolution {
  let handledMatrix = deepCloneMatrix(matrix);
  const minimumValue = removeNegativeValues(handledMatrix);
  handledMatrix = generateSimplexMatrix(handledMatrix);

  const referenceSolve = referenceSolution(handledMatrix, positionXY);
  const optimalSolveResult = optimalSolution(referenceSolve.matrix, positionXY);

  const secondPlayersSolution = findResultsFor(optimalSolveResult);
  const firstPlayersSolution = findDualResultsFor("y", optimalSolveResult);

  const lastCellValue =
    optimalSolveResult.matrix[optimalSolveResult.matrix.length - 1][
      optimalSolveResult.matrix[optimalSolveResult.matrix.length - 1].length - 1
    ];
  const gamePrice = 1 / lastCellValue - Math.abs(minimumValue);

  secondPlayersSolution.forEach((value, index) => {
    secondPlayersSolution[index] = value / lastCellValue;
  });

  firstPlayersSolution.forEach((value, index) => {
    firstPlayersSolution[index] = value / lastCellValue;
  });

  return {
    firstPlayersSolution,
    secondPlayersSolution,
    outputMatrix: optimalSolveResult.matrix,
    positionXY,
    strategyType: StrategiesType.MixedStrategies,
    gamePrice,
  };
}

function removeNegativeValues(matrix: number[][]): number {
  let minimumValue = 0;
  matrix.forEach((row) => {
    row.forEach((value) => {
      minimumValue = Math.min(minimumValue, value);
    });
  });

  if (minimumValue < 0) {
    matrix.forEach((row) => {
      row.forEach((_, columnIndex) => {
        row[columnIndex] += Math.abs(minimumValue);
      });
    });
  }

  return minimumValue;
}

function findSolveInPureStrategies(
  matrix: number[][],
  positionXY: positionXY,
): MatrixGameSolution {
  const gamePrice = findMinGamePrice(matrix);
  const minGamePriceIndex = findMinGamePriceIndex(matrix);
  const maxGamePriceIndex = findMaxGamePriceIndex(matrix);

  if (minGamePriceIndex < 0 || maxGamePriceIndex < 0) {
    return {
      firstPlayersSolution: [],
      secondPlayersSolution: [],
      outputMatrix: matrix,
      positionXY,
      strategyType: StrategiesType.Undefined,
      gamePrice: 0,
    };
  }

  const firstPlayersSolution = Array(matrix.length).fill(0);
  firstPlayersSolution[minGamePriceIndex] = 1;

  const secondPlayersSolution = Array(matrix[0].length).fill(0);
  secondPlayersSolution[maxGamePriceIndex] = 1;

  return {
    firstPlayersSolution,
    secondPlayersSolution,
    outputMatrix: matrix,
    positionXY,
    strategyType: StrategiesType.PureStrategies,
    gamePrice,
  };
}

function findMinGamePrice(matrix: number[][]): number {
  const minValuesArray = matrix.map((row) => Math.min(...row));
  return Math.max(...minValuesArray);
}

function findMinGamePriceIndex(matrix: number[][]): number {
  const minValuesArray = matrix.map((row) => Math.min(...row));
  const minValue = Math.max(...minValuesArray);
  return minValuesArray.indexOf(minValue);
}

function findMaxGamePrice(matrix: number[][]): number {
  const maxValuesArray = findColumnsMaxValues(matrix);
  return Math.min(...maxValuesArray);
}

function findMaxGamePriceIndex(matrix: number[][]): number {
  const maxValuesArray = findColumnsMaxValues(matrix);
  const maxValue = Math.min(...maxValuesArray);
  return maxValuesArray.indexOf(maxValue);
}

function findColumnsMaxValues(matrix: number[][]): number[] {
  const maxValuesArray = [];
  const columns = matrix[0].length;

  for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
    let maxValue = Number.MIN_VALUE;
    for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
      maxValue = Math.max(maxValue, matrix[rowIndex][columnIndex]);
    }
    maxValuesArray.push(maxValue);
  }
  return maxValuesArray;
}

function generateSimplexMatrix(matrix: number[][]): number[][] {
  let newMatrix = deepCloneMatrix(matrix);

  newMatrix = addColumnPlaceholder(newMatrix, 1);
  newMatrix = addRowPlaceholder(newMatrix, -1);
  newMatrix[newMatrix.length - 1][newMatrix[newMatrix.length - 1].length - 1] =
    0;

  return newMatrix;
}

function findDualResultsFor(
  name: string = "y",
  output: referenceSolutionResult,
): number[] {
  if (!output.matrix) return [];

  const res: number[] = new Array(output.positionXY.left.length).fill(0);
  for (let index = 0; index < output.positionXY.top.length; index++) {
    if (output.positionXY.top[index].startsWith(name)) {
      const digitAfterX = output.positionXY.top[index].substring(name.length);
      try {
        const result = parseInt(digitAfterX, 10);
        res[result - 1] = output.matrix[output.matrix.length - 1][index];
      } catch (e) {
        console.log("Ouch, number format exception");
      }
    }
  }
  return res;
}

function findResultsFor(output: referenceSolutionResult): number[] {
  const res: number[] = new Array(output.positionXY.left.length).fill(0);
  for (let index = 0; index < output.positionXY.left.length; index++) {
    if (output.positionXY.left[index].startsWith("x")) {
      const digitAfterX = output.positionXY.left[index].substring(1);
      try {
        const elementIndex = parseInt(digitAfterX, 10);
        if (elementIndex <= res.length) {
          res[elementIndex - 1] =
            output.matrix[index][output.matrix[index].length - 1];
        }
      } catch (e) {
        console.log("Ouch, number format exception");
      }
    }
  }
  return res;
}
