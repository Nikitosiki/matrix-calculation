function calculateMatrixRank(matrix: number[][]): number {
  const augmentedMatrix: number[][] = matrix.map(row => [...row]);

  const numRows = augmentedMatrix.length;
  const numCols = augmentedMatrix[0].length;

  let rank = 0;

  for (let col = 0; col < numCols && rank < numRows; col++) {
    // Знаходження ненульового елемента в стовпці col
    let nonZeroRow = rank;
    while (nonZeroRow < numRows && augmentedMatrix[nonZeroRow][col] === 0) {
      nonZeroRow++;
    }

    if (nonZeroRow === numRows) {
      continue; // Всі рядки під колом col мають нульові значення, переходимо до наступного стовпця
    }

    // Обмін рядками, щоб мати ненульовий елемент на позначеній позиції
    [augmentedMatrix[rank], augmentedMatrix[nonZeroRow]] = [augmentedMatrix[nonZeroRow], augmentedMatrix[rank]];

    // Зрізання стовпця до ненульового елемента, щоб усі інші рядки мали нульові значення
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