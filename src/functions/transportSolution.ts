import { addColumnPlaceholder, addRowPlaceholder, deepCloneArray } from "./utils";

export interface Transport {
  rowsPossibility: number[];
  colsNeed: number[];
  matrix: number[][];
}

export interface TransportSolve {
  solve: number[][];
  price: number;
}

export function solveTransport(input: Transport): TransportSolve {
  let problem = cloneInput(input);
  if (!checkIsClosedProblem(input)) {
    const quantitativePossibilitySum = input.rowsPossibility.reduce(
      (acc, val) => acc + val,
      0,
    );
    const quantitativeNeed = input.colsNeed.reduce((acc, val) => acc + val, 0);
    const difference = quantitativePossibilitySum - quantitativeNeed;
    problem =
      difference > 0
        ? makeNewNeed(problem, difference)
        : makeNewPossibility(problem, difference);
  }

  const referenceSolve = referenceSolveByNorthwestCorner(problem);
  const check1 = checkBasisCells(
    problem.rowsPossibility.length,
    problem.colsNeed.length,
    referenceSolve,
  );
  if (!check1) {
    console.log("Count base cells error");
    return { price: 0, solve: referenceSolve };
  }

  potentialStep(problem, referenceSolve);

  const cost = findCost(problem, referenceSolve);
  console.log("New cost = " + cost);

  return { price: cost, solve: referenceSolve };
}

function potentialStep(problem: Transport, baseArray: number[][]): void {
  while (true) {
    const rowsPotential = Array(problem.rowsPossibility.length).fill(0.0).map((_, index) => index === 0 ? 0.0 : NaN);
    const colsPotential = Array(problem.colsNeed.length).fill(NaN);

    let countReferences = 0;
    for (let row = 0; row < baseArray.length; row++) {
      for (let col = 0; col < baseArray[0].length; col++) {
        if (baseArray[row][col] > 0.0) {
          countReferences++;
        }
      }
    }

    if (rowsPotential.length + colsPotential.length - 1 !== countReferences) {
      console.log("Need to add reference point!");
      return;
    }

    while (rowsPotential.some(isNaN) || colsPotential.some(isNaN)) {
      for (let row = 0; row < baseArray.length; row++) {
        for (let col = 0; col < baseArray[0].length; col++) {
          if (baseArray[row][col] !== 0.0) {
            if (!isNaN(rowsPotential[row])) {
              colsPotential[col] =
                problem.matrix[row][col] - rowsPotential[row];
            }
            if (!isNaN(colsPotential[col])) {
              rowsPotential[row] =
                problem.matrix[row][col] - colsPotential[col];
            }
          }
        }
      }
      // console.log("baseArray: ", baseArray);
      // console.log("rowsPotential: ", rowsPotential.join("\t"));
      // console.log("colsPotential: ", colsPotential.join("\t"));
    }

    console.log("Rows potential: ", rowsPotential.join("\t"));
    console.log("Cols potential: ", colsPotential.join("\t"));

    const newMatrixPrice = Array.from({ length: baseArray.length }, () =>
      Array(baseArray[0].length).fill(0.0),
    );

    for (let row = 0; row < baseArray.length; row++) {
      for (let col = 0; col < baseArray[0].length; col++) {
        if (baseArray[row][col] === 0.0) {
          newMatrixPrice[row][col] = rowsPotential[row] + colsPotential[col];
        }
      }
    }

    console.log("New price matrix without base prices: ", newMatrixPrice);

    const cells = [];

    for (let row = 0; row < baseArray.length; row++) {
      for (let col = 0; col < baseArray[0].length; col++) {
        if (
          baseArray[row][col] === 0.0 &&
          newMatrixPrice[row][col] > problem.matrix[row][col]
        ) {
          cells.push({ value: newMatrixPrice[row][col], row, col });
        }
      }
    }

    if (cells.length === 0) {
      console.log(baseArray);
      console.log("END");
      return;
    }

    const cellToOptimization = cells.reduce((prev, current) =>
      prev.value > current.value ? prev : current,
    );

    console.log(
      "Cell to optimization = [" +
        cellToOptimization.row +
        "; " +
        cellToOptimization.col +
        "]",
    );

    const path = findConnectedPath(baseArray, cellToOptimization);

    let minimum = baseArray[path[1][0]][path[1][1]];
    for (let i = 1; i < path.length; i += 2) {
      const value = baseArray[path[i][0]][path[i][1]];
      if (value < minimum) {
        minimum = value;
      }
    }

    for (let i = 0; i < path.length; i++) {
      if (i % 2 === 0) {
        baseArray[path[i][0]][path[i][1]] += minimum;
      } else {
        baseArray[path[i][0]][path[i][1]] -= minimum;
      }
    }

    console.log("New base array: ", baseArray);
    const cost = findCost(problem, baseArray);
    console.log("New cost = " + cost);
  }
}

function findConnectedPath(
  matrix: number[][],
  start: { value: number; row: number; col: number },
): number[][] {
  function dfs(
    matrix: number[][],
    visited: boolean[][],
    row: number,
    col: number,
    path: number[][],
  ): void {
    const numRows = matrix.length;
    const numCols = matrix[0].length;

    let needExit = false;
    let isColumn = false;

    // Add start point
    path.push([row, col]);

    // Easy square path
    for (let r = 0; r < matrix.length; r++) {
      if (r !== row && matrix[r][col] > 0.0) {
        for (let c = 0; c < matrix[0].length; c++) {
          if (c !== col && matrix[row][c] > 0.0) {
            if (matrix[r][c] > 0.0) {
              path.push([r, col]);
              path.push([r, c]);
              path.push([row, c]);
              return;
            }
          }
        }
      }
    }

    while (!needExit) {
      needExit = true;

      const currentRow = path[path.length - 1][0];
      const currentCol = path[path.length - 1][1];

      // Golden hammer
      // If we're moving by rows
      if (!isColumn) {
        // if we reach the right row
        if (!visited[row][currentCol] && matrix[row][currentCol] > 0.0) {
          visited[row][currentCol] = true;
          path.push([row, currentCol]);
          break;
        } else {
          // Moving by rows
          for (let r = 0; r < numRows; r++) {
            // Skip visited
            if (visited[r][currentCol]) continue;
            if (matrix[r][currentCol] > 0.0) {
              let exec = false;
              // Moving by cols
              for (let c = 0; c < numCols; c++) {
                // Skip current
                if (c === currentCol) continue;
                if (matrix[r][c] > 0.0) {
                  // Need add to path
                  exec = true;
                }
              }
              if (exec) {
                visited[r][currentCol] = true;
                path.push([r, currentCol]);
                isColumn = true;
                needExit = false;
                break;
              }
            }
          }
        }
      } else {
        // if we reach the right column
        if (!visited[currentRow][col] && matrix[currentRow][col] > 0.0) {
          visited[currentRow][col] = true;
          path.push([currentRow, col]);
          break;
        } else {
          // Moving by columns
          for (let c = 0; c < numCols; c++) {
            // Skip visited
            if (visited[currentRow][c]) continue;
            if (matrix[currentRow][c] > 0.0) {
              let exec = false;
              // Moving by rows
              for (let r = 0; r < numRows; r++) {
                if (r === currentRow) continue;
                if (matrix[r][c] > 0.0) {
                  exec = true;
                }
              }
              if (exec) {
                visited[currentRow][c] = true;
                path.push([currentRow, c]);
                isColumn = false;
                needExit = false;
                break;
              }
            }
          }
        }
      }
    }
  }

  function findClosedPath(
    matrix: number[][],
    startRow: number,
    startCol: number,
  ): number[][] {
    const visited: boolean[][] = Array(matrix.length)
      .fill(false)
      .map(() => Array(matrix[0].length).fill(false));
    const path: number[][] = [];

    dfs(matrix, visited, startRow, startCol, path);

    return path;
  }

  const res = findClosedPath(matrix, start.row, start.col);

  console.log("Vertices: ", res);

  return res;
}

function checkBasisCells(
  rows: number,
  cols: number,
  solve: number[][],
): boolean {
  const count = rows + cols - 1;
  let founded = 0;

  for (let row = 0; row < solve.length; row++) {
    for (let col = 0; col < solve[0].length; col++) {
      if (solve[row][col] > 0.0) founded++;
    }
  }

  return founded === count;
}

function findCost(problem: Transport, solve: number[][]): number {
  let cost = 0.0;
  for (let row = 0; row < problem.matrix.length; row++) {
    for (let col = 0; col < problem.matrix[0].length; col++) {
      cost += solve[row][col] * problem.matrix[row][col];
    }
  }

  return cost;
}

function referenceSolveByNorthwestCorner(input: Transport): number[][] {
  const problem = cloneInput(input);
  const solve: number[][] = Array.from({ length: problem.matrix.length }, () =>
    Array(problem.matrix[0].length).fill(0.0),
  );

  let row = 0;
  let col = 0;

  while (row < problem.matrix.length && col < problem.matrix[0].length) {
    if (problem.rowsPossibility[row] > 0) {
      const difference = Math.min(
        problem.colsNeed[col],
        problem.rowsPossibility[row],
      );
      solve[row][col] += difference;

      problem.colsNeed[col] -= difference;
      problem.rowsPossibility[row] -= difference;

      if (
        problem.colsNeed[col] === 0.0 &&
        problem.rowsPossibility[row] === 0.0
      ) {
        row++;
        col++;
      } else if (problem.colsNeed[col] === 0.0) {
        col++;
      } else {
        row++;
      }
    }
  }

  console.log("Reference solve by Northwest Corner\n", solve);
  console.log("Cost: ", findCost(problem, solve));

  return solve;
}

function makeNewNeed(
  matrix: Transport,
  difference: number,
): Transport {
  addColumnPlaceholder(matrix.matrix, 0.0);
  const newQuantitativeNeed = [...matrix.colsNeed, difference];
  return { ...matrix, colsNeed: newQuantitativeNeed };
}

function makeNewPossibility(
  matrix: Transport,
  difference: number,
): Transport {
  addRowPlaceholder(matrix.matrix, 0.0);
  const newQuantitativePossibility = [...matrix.rowsPossibility, difference];
  return { ...matrix, rowsPossibility: newQuantitativePossibility };
}

function cloneInput(input: Transport): Transport {
  return {
    rowsPossibility: deepCloneArray(input.rowsPossibility),
    colsNeed: deepCloneArray(input.colsNeed),
    matrix: deepCloneArray(input.matrix),
  };
}

function checkIsClosedProblem(input: Transport): boolean {
  const quantitativePossibilitySum = input.rowsPossibility.reduce(
    (acc, val) => acc + val,
    0,
  );
  const quantitativeNeed = input.colsNeed.reduce((acc, val) => acc + val, 0);

  return quantitativePossibilitySum === quantitativeNeed;
}