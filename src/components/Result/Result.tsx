import { FC } from "react";
import Matrix from "../Matrix/Matrix";
import inverseMatrix from "../../functions/inverseMatrix";
import { roundedMatrix, roundedRow } from "../../functions/utils";
import matrixRank from "../../functions/matrixRank";
import linearSystemSolution from "../../functions/linearSystemSolution";

interface IResult {
  matrixA: number[][];
  matrixB: number[];
}

const Result: FC<IResult> = ({ matrixA, matrixB }) => {
  const invertedMatrix = inverseMatrix(matrixA);
  const rank = matrixRank(matrixA);
  const solution = linearSystemSolution(matrixA, matrixB);

  return (
    <div className="inline-flex flex-col">
      <p className="mt-4 font-bold">Finding the inverse matrix.</p>
      <span>--------------------------------------------------</span>
      {invertedMatrix ? (
        <>
          <span>Inverse matrix:</span>
          <Matrix value={roundedMatrix(invertedMatrix)} />
        </>
      ) : (
        <>
          <span>The inverse matrix was not found.</span>
        </>
      )}

      <p className="mt-4 font-bold">Finding the rank of a matrix.</p>
      <span>--------------------------------------------------</span>
      <span>Matrix rank: {rank}</span>

      <p className="mt-4 font-bold">
        Solution of the system of linear equations.
      </p>
      <span>--------------------------------------------------</span>
      {solution ? (
        <>
          <span>Solving the system of linear equations:</span>
          <Matrix value={roundedRow(solution)} />
        </>
      ) : (
        <>
          <span>A matrix does not have an inverse matrix.</span>
        </>
      )}
    </div>
    // <>
    //   {invertedMatrix ? (
    //     <>
    //       <p>Inverse matrix:</p>
    //       <Matrix value={roundedMatrix(invertedMatrix)} />
    //     </>
    //   ) : (
    //     <>
    //       <p>
    //         The matrix is not square, the inverse matrix does not exist.
    //       </p>
    //     </>
    //   )}

    //   <p>Matrix rank: {rank}</p>

    //   {solution ? (
    //     <>
    //       <p>Solving the system of linear equations:</p>
    //       <Matrix value={roundedRow(solution)} />
    //     </>
    //   ) : (
    //     <>
    //       <p>
    //       A matrix does not have an inverse matrix.
    //       </p>
    //     </>
    //   )}
    // </>
  );
};

export default Result;
