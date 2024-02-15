import jordanStep from "./jordanStep";

function calculateMatrixRank(matrix: number[][]): number {
  let n = matrix.length; // Поиск самой маленькой стороны матрицы
  matrix.forEach((row) => row.length < n && (n = row.length));

  let rank = 0;
  
  for (let index = 0; index < n; index++) {
    if (matrix[index][index] === 0) continue;
    matrix = jordanStep(matrix, index);
    rank++;
  }

  return rank;
}

export default calculateMatrixRank;
