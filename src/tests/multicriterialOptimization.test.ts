import { findCompromiseSolution } from "../functions/multicriterialOptimization";
import { toStrictEqual1Array } from "./toStrictEqualArray";

// test("multicriterialOptimization_test-2", () => {
//   const m1 = [
//     [1, -1, 1, 1, 2],
//     [1, 1, 1, -1, 2],
//     [-1, 1, 1, 1, 2],
//     [1, 1, -1, 1, 2],
//     [-1, 8, -1, -4, 0],
//   ];

//   const m1z = [1, -8, 1, 4];

//   const m2 = [
//     [1, -1, 1, 1, 2],
//     [1, 1, 1, -1, 2],
//     [-1, 1, 1, 1, 2],
//     [1, 1, -1, 1, 2],
//     [-1, 3, 5, 1, 0],
//   ];

//   const m2z = [-1, 3, 5, 1];

//   const m3 = [
//     [1, -1, 1, 1, 2],
//     [1, 1, 1, -1, 2],
//     [-1, 1, 1, 1, 2],
//     [1, 1, -1, 1, 2],
//     [-3, -1, -1, 1, 0],
//   ];

//   const m3z = [3, 1, 1, -1];

//   const expected = [1.46, 0, 0, 0.54];

//   console.log("Result (test-2):");

//   const compromiseVector = findCompromiseSolution(
//     [m1, m2, m3],
//     [m1z, m2z, m3z],
//   );

//   console.log("Compromise vector: ", compromiseVector)

//   expect(toStrictEqual1Array(expected, compromiseVector)).toBe(true);
// });

test("multicriterialOptimization_test-v13", () => {
  const m1 = [
    [-1, 0, 3, -2, 1, 3],
    [1, -1, 0, 1, 1, 3],
    [1, 3, -1, -1, 1, 2],
    [-2, -1, -1, -3, -1, 0],
  ];

  const m1z = [2, 1, 1, 3, 1];

  const m2 = [
    [-1, 0, 3, -2, 1, 3],
    [1, -1, 0, 1, 1, 3],
    [1, 3, -1, -1, 1, 2],
    [3, 0, -1, 0, 1, 0],
  ];

  const m2z = [3, 0, -1, 0, 1];

  const m3 = [
    [-1, 0, 3, -2, 1, 3],
    [1, -1, 0, 1, 1, 3],
    [1, 3, -1, -1, 1, 2],
    [-1, 1, 0, 0, 1, 0],
  ];

  const m3z = [1, -1, 0, 0, -1];

  const expected = [1.74, 2.52, 3.52, 3.78, 0];

  console.log("Result (test-v13):");

  const compromiseVector = findCompromiseSolution(
    [m1, m2, m3],
    [m1z, m2z, m3z],
  );

  console.log("Compromise vector: ", compromiseVector)

  expect(toStrictEqual1Array(expected, compromiseVector)).toBe(true);
});