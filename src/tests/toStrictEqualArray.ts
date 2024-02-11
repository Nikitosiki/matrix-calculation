// export function toStrictEqual2Array(value: number[][], correct: number[][]) {
//   expect(value.length).toBe(correct.length);
//   for (let index = 0; index < correct.length; index++)
//     expect(value[index].length).toBe(correct[index].length);

//   for (let i = 0; i < correct.length; i++)
//     for (let j = 0; j < correct[i].length; j++)
//       expect(correct[i][j]).toBeCloseTo(correct[i][j]);
// }

export function toStrictEqual1Array(
  value: number[],
  correct: number[],
): boolean {
  if (value.length != correct.length) return false;

  for (let i = 0; i < correct.length; i++)
    if (!areEqual(value[i], correct[i])) return false;

  return true;
}

export function toStrictEqual2Array(
  value: number[][],
  correct: number[][],
): boolean {
  if (value.length != correct.length) return false;
  for (let index = 0; index < correct.length; index++)
    if (value[index].length != correct[index].length) return false;

  for (let i = 0; i < correct.length; i++)
    for (let j = 0; j < correct[i].length; j++)
      if (!areEqual(value[i][j], correct[i][j])) return false;

  return true;
}

function areEqual(number1: number, number2: number): boolean {
  return Math.abs(number1 - number2) < 0.002;
}
