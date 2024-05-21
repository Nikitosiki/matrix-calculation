export class Task {
  taskId: number;
  previous: number[];
  duration: number;
  resources: number;
  earlyStart: number;
  lateFinish: number;
  isVirtual: boolean;

  constructor(
    taskId: number,
    duration: number,
    resources: number,
    previous: number[] = [],
    earlyStart: number = 0,
    lateFinish: number = 0,
    isVirtual: boolean = false
  ) {
    this.taskId = taskId;
    this.previous = previous;
    this.duration = duration;
    this.resources = resources;
    this.earlyStart = earlyStart;
    this.lateFinish = lateFinish;
    this.isVirtual = isVirtual;
  }

  get earlyFinish(): number {
    return this.earlyStart + this.duration;
  }

  get lateStart(): number {
    return this.lateFinish - this.duration;
  }

  get reserveTime(): number {
    return this.lateFinish - this.earlyFinish;
  }
}

export function optimalSolution(tasksList: Task[]): Task[] {
  const tasks = makeStartTasksList(tasksList);
  // console.log("Constructed list of starting tasks");

  calculateEarlyStarts(tasks);
  // console.log("Calculated early starts");

  calculateLateFinishes(tasks);
  // console.log("Calculated late finishes");

  return tasks;
}

export function printTaskList(tasksList: Task[]): void {
  tasksList = [...tasksList].sort((a, b) => a.taskId - b.taskId);
  console.log("Tasks: ");
  tasksList.forEach((task) => {
    // console.log(task);
    console.log(`Task: ${task.taskId}`);
    console.log(`Duration: ${task.duration}`);
    // console.log(`Resources: ${task.resources}`);
    console.log(`Early start: ${task.earlyStart}`);
    console.log(`Early finish: ${task.earlyFinish}`);
    // console.log(`Late start: ${task.lateStart}`);
    // console.log(`Late finish: ${task.lateFinish}`);
    // console.log(`Reserve time: ${task.reserveTime}`);
  });

  const criticalTasks = getCriticalTaskChain(tasksList);

  let criticalTasksPath = "";
  criticalTasks.forEach((task) => {
    if (!task.isVirtual) {
      criticalTasksPath += `${task.taskId} - `;
    }
  });
  criticalTasksPath = criticalTasksPath.substring(
    0,
    criticalTasksPath.length - 3,
  );
  console.log("Critical path: ", criticalTasksPath);
  console.log("Project duration: ", Math.max(...criticalTasks.map((task) => task.earlyFinish)));
}

export function printLoadChart(tasksList: Task[]): void {
  const tasks = tasksList.filter((task) => !task.isVirtual);
  const maxWidth = Math.max(...tasks.map((task) => task.earlyFinish));

  const timeToLoad: [number, number][] = [];

  for (let time = 0; time <= maxWidth; time++) {
    const fitTasks = tasks.filter(
      (task) => time >= task.earlyStart && time < task.earlyFinish,
    );
    const load = fitTasks.reduce((sum, task) => sum + task.resources, 0);

    // console.log(
    //   `Time: ${time} Load: ${load} Tasks: ${fitTasks.map((task) => task.taskId).join(", ")}`,
    // );
    timeToLoad.push([time, load]);
  }

  const maxHeight = Math.max(...timeToLoad.map(([_, load]) => load));

  console.log("Load chart: ");

  const maxLabelLength = Math.max(
    ...timeToLoad.map(([time]) => time.toString().length),
  );
  const labelFormat = (day: number) =>
    day.toString().padStart(maxLabelLength, " ");

  // Print chart by rows
  for (let height = maxHeight; height >= 0; height--) {
    for (const [, dayHeight] of timeToLoad) {
      if (dayHeight > height) {
        process.stdout.write("*".padEnd(maxLabelLength + 1, " "));
      } else {
        process.stdout.write(" ".repeat(maxLabelLength + 1));
      }
    }
  }

  // for (let height = maxHeight; height >= 0; height--) {
  //   let row = "";
  //   for (const [, dayHeight] of timeToLoad) {
  //     if (dayHeight > height) {
  //       row += "*".padEnd(maxLabelLength + 1, " ");
  //     } else {
  //       row += " ".repeat(maxLabelLength + 1);
  //     }
  //   }
  //   console.log(row);
  // }

  // Print axis
  for (const [day] of timeToLoad) {
    process.stdout.write(labelFormat(day) + " ");
  }
}

export function getCriticalTaskChain(tasks: Task[]): Task[] {
  return sortTaskChain(tasks.filter((task) => task.reserveTime === 0));
}

function sortTaskChain(tasks: Task[]): Task[] {
  const visitedTasks: Task[] = [];
  while (visitedTasks.length !== tasks.length) {
    for (const task of tasks) {
      if (visitedTasks.some((t) => t.taskId === task.taskId)) continue;

      const nextTasks = tasks.filter((t) => t.previous.includes(task.taskId));

      // if the next ones have not yet been solved.
      if (
        !visitedTasks
          .map((t) => t.taskId)
          .includesAll(nextTasks.map((t) => t.taskId))
      )
        continue;
      visitedTasks.push(task);
    }
  }

  return visitedTasks.reverse();
}

export function findProjectDuration(tasks: Task[]): number {
  return Math.max(...tasks.map((task) => task.earlyFinish));
}

function calculateLateFinishes(tasks: Task[]): void {
  const visitedTasksId: number[] = [];
  while (visitedTasksId.length !== tasks.length) {
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      if (visitedTasksId.includes(task.taskId)) continue;

      const nextTasks = tasks.filter((t) => t.previous.includes(task.taskId));

      // if the next ones have not yet been solved.
      if (!visitedTasksId.includesAll(nextTasks.map((t) => t.taskId))) continue;
      visitedTasksId.push(task.taskId);

      // if no tasks after
      if (nextTasks.length === 0) {
        tasks[i] = new Task(
          task.taskId,
          task.duration,
          task.resources,
          task.previous,
          task.earlyStart,
          task.earlyFinish,
          task.isVirtual,
        );
        continue;
      }

      // for handle tasks after
      const lateFinish = Math.min(...nextTasks.map((t) => t.lateStart));

      tasks[i] = new Task(
        task.taskId,
        task.duration,
        task.resources,
        task.previous,
        task.earlyStart,
        lateFinish,
        task.isVirtual,
      );
    }
  }
}

function calculateEarlyStarts(tasks: Task[]): void {
  const visitedTasksId: number[] = [];
  while (visitedTasksId.length !== tasks.length) {
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      if (visitedTasksId.includes(task.taskId)) continue;

      // if the previous ones have not yet been solved.
      if (!visitedTasksId.includesAll(task.previous)) continue;
      visitedTasksId.push(task.taskId);

      // if no tasks before
      if (task.previous.length === 0) {
        tasks[i] = new Task(
          task.taskId,
          task.duration,
          task.resources,
          task.previous,
          0,
          task.lateFinish,
          task.isVirtual,
        );
        continue;
      }

      // for handle tasks before
      const earlyStart = Math.max(
        ...tasks
          .filter((t) => task.previous.includes(t.taskId))
          .map((t) => t.earlyFinish),
      );

      tasks[i] = new Task(
        task.taskId,
        task.duration,
        task.resources,
        task.previous,
        earlyStart,
        task.lateFinish,
        task.isVirtual,
      );
    }
  }
}

function makeStartTasksList(tasksList: Task[]): Task[] {
  let tasks = deepCopyTasks(tasksList);

  const firstTasks = tasks
    .filter((task) => task.previous.length === 0)
    .map((task) => task.taskId);

  // Add first task is needed
  if (firstTasks.length > 1) {
    const startTaskId = findUniqueInt(tasks);
    const startTask = new Task(startTaskId, 0, 0, [], 0, 0, true);

    tasks = tasks.map((task) => {
      if (task.previous.length === 0) {
        task.previous = [startTaskId];
      }
      return task;
    });

    tasks = [startTask, ...tasks];
  }

  // Adding final task is needed
  const endTasks = tasks
    .filter((task) => tasks.every((t) => !t.previous.includes(task.taskId)))
    .map((task) => task.taskId);

  if (endTasks.length > 1) {
    const endTaskId = findUniqueInt(tasks);
    const endTask = new Task(endTaskId, 0, 0, endTasks, 0, 0, true);

    tasks = [...tasks, endTask];
  }

  return tasks;
}

function findUniqueInt(tasks: Task[]): number {
  let id = -1;
  while (tasks.some((task) => task.taskId === id)) {
    id++;
  }
  return id;
}

function deepCopyTasks(tasks: Task[]): Task[] {
  return tasks.map(
    (task) =>
      new Task(
        task.taskId,
        task.duration,
        task.resources,
        [...task.previous],
        task.earlyStart,
        task.lateFinish,
        task.isVirtual,
      ),
  );
}

// Array.prototype.includesAll polyfill
declare global {
  interface Array<T> {
    includesAll(array: T[]): boolean;
  }
}

Array.prototype.includesAll = function (array: unknown[]): boolean {
  return array.every((item) => this.includes(item));
};
