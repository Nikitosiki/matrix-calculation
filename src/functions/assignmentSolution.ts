import { deepCloneMatrix } from "./utils";

type AssignmentProblemSolve = {
  assignments: number[][];
  cost: number;
}

export function solveAssignmentProblem(inputMatrix: number[][]): AssignmentProblemSolve {
  const matrix = deepCloneMatrix(inputMatrix);

  minusMinByRows(matrix);
  minusMinByCols(matrix);
  handleRemoveZeroCells(matrix);
  const assignmentMatrix = findAssignments(matrix);
  const cost = findAssignmentCost(assignmentMatrix, inputMatrix);
  
  return {
      assignments: assignmentMatrix,
      cost: cost
  };
}

function findAssignmentCost(assignmentMatrix: number[][], inputMatrix: number[][]): number {
  let cost = 0;
  for (let r = 0; r < assignmentMatrix.length; r++) {
      for (let c = 0; c < assignmentMatrix[r].length; c++) {
          if (assignmentMatrix[r][c] === 1) {
              cost += inputMatrix[r][c];
          }
      }
  }
//   console.log("findAssignmentCost", assignmentMatrix, inputMatrix, cost);
  return cost;
}

function findAssignments(matrix: number[][]): number[][] {
  const assignments: [number, number][] = [];
  const assignmentMatrix: number[][] = Array.from({ length: matrix.length }, () => Array(matrix.length).fill(0));

  while (assignments.length < matrix.length) {
      let rowWithOneZero: number | null = null;
      let colWithOneZero: number | null = null;

      for (let r = 0; r < matrix.length; r++) {
          let countZeros = 0;
          for (let c = 0; c < matrix[r].length; c++) {
              if (assignments.some(([assignedRow, assignedCol]) => assignedRow === r || assignedCol === c)) continue;
              if (matrix[r][c] === 0) {
                  colWithOneZero = c;
                  countZeros++;
              }
          }
          if (countZeros === 1) {
              rowWithOneZero = r;
              break;
          }
      }

      if (rowWithOneZero !== null && colWithOneZero !== null) {
          assignments.push([rowWithOneZero, colWithOneZero]);
      }
  }

  assignments.forEach(([row, col]) => {
      assignmentMatrix[row][col] = 1;
  });

  return assignmentMatrix;
}

function handleRemoveZeroCells(matrix: number[][]): void {
  let removedRowIndices: number[] = [];
  let removedColIndices: number[] = [];

  while (removedRowIndices.length + removedColIndices.length < matrix.length) {
      removedRowIndices = [];
      removedColIndices = [];

      removeAllNullLines(matrix, removedRowIndices, removedColIndices);

      let minElement: number | null = null;
      for (let r = 0; r < matrix.length; r++) {
          for (let c = 0; c < matrix[r].length; c++) {
              if (removedRowIndices.includes(r) || removedColIndices.includes(c)) continue;
              if (minElement === null || matrix[r][c] < minElement) {
                  minElement = matrix[r][c];
              }
          }
      }

      if (minElement === null) {
          console.log("Do not have minimum element");
          return;
      }

      for (let r = 0; r < matrix.length; r++) {
          for (let c = 0; c < matrix[r].length; c++) {
              if (removedRowIndices.includes(r) || removedColIndices.includes(c)) continue;
              matrix[r][c] -= minElement;
          }
      }

      for (let r = 0; r < matrix.length; r++) {
          for (let c = 0; c < matrix[r].length; c++) {
              if (removedRowIndices.includes(r) && removedColIndices.includes(c)) {
                  matrix[r][c] += minElement;
              }
          }
      }

      console.log("Min element: ", minElement)
      console.log("Matrix after 'min': ", matrix)
  }
}

function removeAllNullLines(matrix: number[][], removedRowIndices: number[], removedColIndices: number[]): void {
  for (let i = 0; i <= matrix.length; i++) {
      let rowIndexWithMaxZeros = -1;
      let countRowZeros = 0;
      let colIndexWithMaxZeros = -1;
      let countColZeros = 0;

      for (let r = 0; r < matrix.length; r++) {
          if (removedRowIndices.includes(r)) continue;

          let countZeros = 0;

          for (let c = 0; c < matrix[r].length; c++) {
              if (removedColIndices.includes(c)) continue;
              if (matrix[r][c] !== 0) continue;
              countZeros++;
          }

          if (countZeros > countRowZeros) {
              rowIndexWithMaxZeros = r;
              countRowZeros = countZeros;
          }
      }

      for (let c = 0; c < matrix[0].length; c++) {
          if (removedColIndices.includes(c)) continue;

          let countZeros = 0;
          for (let r = 0; r < matrix.length; r++) {
              if (removedRowIndices.includes(r)) continue;
              if (matrix[r][c] === 0) countZeros++;
          }

          if (countZeros > countColZeros) {
              colIndexWithMaxZeros = c;
              countColZeros = countZeros;
          }
      }

      if (countRowZeros === 0 && countColZeros === 0 && rowIndexWithMaxZeros === -1 && colIndexWithMaxZeros === -1) {
          break;
      }

      if (countRowZeros > countColZeros) {
          removedRowIndices.push(rowIndexWithMaxZeros);
      } else {
          removedColIndices.push(colIndexWithMaxZeros);
      }
  }
}

function minusMinByCols(matrix: number[][]): void {
  for (let j = 0; j < matrix[0].length; j++) {
      let min = matrix[0][j];

      for (let r = 0; r < matrix.length; r++) {
          if (matrix[r][j] < min) {
              min = matrix[r][j];
          }
      }
      console.log(`Column ${j+1} found 'min': ${min}`)
      for (let r = 0; r < matrix.length; r++) {
          matrix[r][j] -= min;
      }
  }
  console.log("Matrix after: ", matrix)
}

function minusMinByRows(matrix: number[][]): void {
  for (let i = 0; i < matrix.length; i++) {
      const min = Math.min(...matrix[i]);
      console.log(`Line ${i+1} found 'min': ${min}`)
      for (let c = 0; c < matrix[i].length; c++) {
          matrix[i][c] -= min;
      }
  }
  console.log("Matrix after: ", matrix)
}