import { solveMatrixGame } from "./gameSolution";
import { optimalSolution } from "./optimalSolution";
import { calcSolution, referenceSolution, referenceSolutionResult } from "./referenceSolution";
import { roundedMatrix, roundedRow } from "./utils";

export function findCompromiseSolution(
  matrices: number[][][],
  zleft: number[][],
): number[] {
  const optimalSolves = new Array(matrices.length).fill(null).map(() => ({
    matrix: [],
    positionXY: { top: [], left: [] },
    solution: [],
    log: "This is strange",
  }));

  findAllOptimalSolves(matrices, optimalSolves);

  const matrixX = optimalSolves.map((solve) => calcSolution(solve));
  const coefficients = Array.from({ length: matrices.length }, () =>
    new Array(matrices.length).fill(0),
  );

  findNonOptimalityCoefficients(coefficients, zleft, matrixX);
  changeSigns(coefficients);

  const weightingCoefficients = findWeightingCoefficients(coefficients);

  return roundedRow(findCompromiseVector(matrixX, weightingCoefficients));
}

function findWeightingCoefficients(coefficients: number[][]): number[] {
  const input = {
    top: coefficients[0].map((_, i) => `x${i + 1}`),
    left: coefficients.map((_, i) => `y${i + 1}`),
  };
  const solution = solveMatrixGame(coefficients, input);

  const weightingCoefficients = coefficients.map(
    (_, i) => solution.firstPlayersSolution[i] ?? 0,
  );

  roundedRow(weightingCoefficients);

  console.log("Weighting coefficients: ", weightingCoefficients);

  return weightingCoefficients;
}

function findCompromiseVector(
  matrixX: number[][],
  weightingCoefficients: number[],
): number[] {
  return matrixX[0].map((_, col) => {
    return matrixX.reduce(
      (sum, row, rowIndex) => sum + row[col] * weightingCoefficients[rowIndex],
      0,
    );
  });
}

function changeSigns(matrix: number[][]): void {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      matrix[i][j] = -matrix[i][j];
    }
  }
}

function findNonOptimalityCoefficients(
  coefficients: number[][],
  cMatrix: number[][],
  xMatrix: number[][],
): void {
  for (let j = 0; j < coefficients.length; j++) {
    const cjxj = sumCX(cMatrix, xMatrix, j, j);
    for (let i = 0; i < coefficients[0].length; i++) {
      const ixj = sumCX(cMatrix, xMatrix, i, j);
      coefficients[i][j] = Math.abs(ixj / cjxj - 1.0);
    }
  }

  console.log("Matrix of non-optimal solutions: ", roundedMatrix(coefficients));
}

function sumCX(
  cMatrix: number[][],
  xMatrix: number[][],
  indexX: number,
  indexC: number,
): number {
  return cMatrix[indexC].reduce(
    (sum, c, index) => sum + c * xMatrix[indexX][index],
    0,
  );
}

function findAllOptimalSolves(
  matrices: number[][][],
  optimalSolves: referenceSolutionResult[],
): void {
  console.log("\nx results");

  matrices.forEach((matrix, index) => {
    const input = {
      top: Array.from({ length: matrix[0].length - 1 }, (_, i) => `x${i + 1}`),
      left: Array.from({ length: matrix.length - 1 }, (_, i) => `y${i + 1}`),
    };

    const referenceSolve = referenceSolution(matrix, input);

    const optimalSolveResult = optimalSolution(
      referenceSolve.matrix,
      referenceSolve.positionXY,
    );

    console.log("_______________________________");
    console.log(`#${index + 1} simplex`);
    console.log("# left: ", optimalSolveResult.positionXY.left);
    console.log("# top: ", optimalSolveResult.positionXY.top);
    console.log("# end matrix: ", optimalSolveResult.matrix);
    console.log("# solve: ", calcSolution(optimalSolveResult));
    console.log("_______________________________");

    optimalSolves[index] = optimalSolveResult;
  });
}
