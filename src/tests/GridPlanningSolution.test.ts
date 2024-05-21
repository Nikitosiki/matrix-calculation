import {
  Task,
  findProjectDuration,
  getCriticalTaskChain,
  optimalSolution,
  printLoadChart,
  printTaskList,
} from "../functions/GridPlanningSolution";
import { toStrictEqual1Array } from "./toStrictEqualArray";

// test("gridPlanningSolution_test-1", () => {
//   const tasks = [
//     new Task(1, 5, 2, []),
//     new Task(2, 8, 3, [1]),
//     new Task(3, 3, 2, [1]),
//     new Task(4, 6, 2, [1]),
//     new Task(5, 7, 3, [2]),
//     new Task(6, 6, 2, [2, 3]),
//     new Task(7, 4, 2, [4, 5, 6]),
//   ];

//   const expectedChain = [1, 2, 5, 7];
//   const expectedProjectDuration = 24;

//   console.log("Result (test-1):");

//   const result = optimalSolution(tasks);

//   printTaskList(result);
//   printLoadChart(result);

//   const outputCriticalChain = getCriticalTaskChain(result)
//     .filter((task) => !task.isVirtual)
//     .map((task) => task.taskId);
//   const projectDuration = findProjectDuration(result);

//   expect(toStrictEqual1Array(outputCriticalChain, expectedChain)).toBe(true);
//   expect(projectDuration).toBe(expectedProjectDuration);
// });

test("gridPlanningSolution_test-2", () => {
  const tasks = [
    new Task(1, 3, 2, []),
    new Task(2, 4, 3, [1]),
    new Task(3, 2, 4, [1]),
    new Task(4, 5, 3, [2]),
    new Task(5, 1, 2, [3]),
    new Task(6, 2, 3, [3]),
    new Task(7, 4, 2, [4, 5]),
    new Task(8, 3, 2, [6, 7]),

  ];

  const expectedChain = [1, 2, 4, 7, 8];
  const expectedProjectDuration = 19;

  console.log("Result (test-2):");

  const result = optimalSolution(tasks);

  printTaskList(result);
  printLoadChart(result);

  const outputCriticalChain = getCriticalTaskChain(result).filter(task => !task.isVirtual).map(task => task.taskId)
  const projectDuration = findProjectDuration(result)

  expect(toStrictEqual1Array(outputCriticalChain, expectedChain)).toBe(true);
  expect(projectDuration).toBe(expectedProjectDuration);
});

// test("gridPlanningSolution_test-v14", () => {
//   const tasks = [
//     new Task(1, 15, 3, []),
//     new Task(2, 7, 4, []),
//     new Task(3, 5, 2, [2]),
//     new Task(4, 6, 1, [1]),
//     new Task(5, 8, 2, [1]),
//     new Task(6, 6, 2, [3]),
//     new Task(7, 10, 3, [4]),
//     new Task(8, 8, 4, [5, 6]),
//     new Task(9, 9, 5, [3]),
//     new Task(10, 12, 3, [5, 6, 7]),
//     new Task(11, 9, 4, [8, 9]),

//   ];

//   const expectedChain = [1, 4, 7, 10];
//   const expectedProjectDuration = 43;

//   console.log("Result (test-v14):");

//   const result = optimalSolution(tasks);

//   printTaskList(result);
//   printLoadChart(result);

//   const outputCriticalChain = getCriticalTaskChain(result).filter(task => !task.isVirtual).map(task => task.taskId)
//   const projectDuration = findProjectDuration(result)

//   expect(toStrictEqual1Array(outputCriticalChain, expectedChain)).toBe(true);
//   expect(projectDuration).toBe(expectedProjectDuration);
// });
