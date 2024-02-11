function calculateMatrixRank(matrix: number[][]): number {
  const augmentedMatrix: number[][] = matrix.map(row => [...row]);

  const numRows = augmentedMatrix.length;
  const numCols = augmentedMatrix[0].length;
  let rank = 0;

  for (let col = 0; col < numCols && rank < numRows; col++) {
    let nonZeroRow = rank;
    while (nonZeroRow < numRows && augmentedMatrix[nonZeroRow][col] === 0) {
      nonZeroRow++;
    }

    if (nonZeroRow === numRows) {
      continue;
    }

    [augmentedMatrix[rank], augmentedMatrix[nonZeroRow]] = [augmentedMatrix[nonZeroRow], augmentedMatrix[rank]];

    for (let i = rank + 1; i < numRows; i++) {
      const factor = augmentedMatrix[i][col] / augmentedMatrix[rank][col];
      for (let j = col; j < numCols; j++) {
        augmentedMatrix[i][j] -= factor * augmentedMatrix[rank][j];
      }
    }
    
    rank++;
  }
  return rank;
}

export default calculateMatrixRank;