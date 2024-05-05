import { optimalSolution } from "./optimalSolution";
import {
  calcSolution,
  positionXY,
  referenceSolution,
  referenceSolutionResult,
} from "./referenceSolution";
import {
  addRow,
  addValueAtPosition,
  deepCloneMatrix,
  roundedMatrix,
  roundedRow,
} from "./utils";

export function integerSolution(
  matrix: number[][],
  positionXY: positionXY,
): referenceSolutionResult {
  let thisMatrix = deepCloneMatrix(matrix);
  let thisPositionXY = positionXY;

  const ret: referenceSolutionResult = {
    matrix: thisMatrix,
    positionXY: thisPositionXY,
    solution: [],
    log: "This is strange",
  };

  const last = (log: string, a:referenceSolutionResult = ret) => {
    a.matrix = roundedMatrix(a.matrix);
    a.log = log;
    a.solution;
    calcSolution(ret);
    return a;
  };

  // eslint-disable-next-line no-constant-condition
  for (let index = 0; index < 9999; index++) {
    const resultReference = referenceSolution(thisMatrix, thisPositionXY);
    if (resultReference.matrix === null) return last("I think I'm broken", resultReference);

    const resultOptimal = optimalSolution(
      resultReference.matrix,
      resultReference.positionXY,
    );
    if (resultOptimal.matrix === null) return last("I think I'm broken", resultOptimal);

    calcSolution(resultOptimal);
    const isAllIntegers = resultOptimal.solution.every(
      (x: number) => x % 1 === 0,
    );

    console.log("isAllIntegers", resultOptimal.solution, isAllIntegers)

    if (isAllIntegers) return last("Integer solution found", resultOptimal);


    // Пошук хi з максимальною дробною частиною
    const indexMaxFractionalPart = resultOptimal.solution.reduce(
      (maxIndex, num, currentIndex) =>
        num % 1 > resultOptimal.solution[maxIndex] % 1
          ? currentIndex
          : maxIndex,
      0,
    );

    // Розрахунок коефіціентів додаткового обмеження

    let newRestriction: number[] = new Array(
      resultOptimal.matrix[indexMaxFractionalPart].length,
    ).fill(0.0);
    resultOptimal.matrix[indexMaxFractionalPart].forEach((value, index) => {
      if (index === resultOptimal.matrix[indexMaxFractionalPart].length - 1) {
        newRestriction[index] = -(value % 1);
      } else {
        newRestriction[index] =
          value === 0 ? 0 : -(value > 0 ? value % 1 : 1 - Math.abs(value % 1));
      }
    });

    console.log("newRestriction",  newRestriction)

    newRestriction = roundedRow(newRestriction)

    // Уведення додаткового обмеження в симплекс-таблицю

    thisMatrix = addRow(
      resultOptimal.matrix,
      resultOptimal.matrix.length - 1,
      newRestriction,
    );

    const dsa = addValueAtPosition(
      resultOptimal.positionXY.left,
      resultOptimal.matrix.length - 1,
      `s${index + 1}`,
    );

    thisPositionXY = {
      top: resultOptimal.positionXY.top,
      left: dsa,
    };
  }

  return last("I think I'm broken");
}
