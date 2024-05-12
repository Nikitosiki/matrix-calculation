import { positionXY } from "./referenceSolution";

interface SimulationResult {
  firstPlayerDecisionIndexes: number[];
  firstPlayerRandom: number[];
  secondPlayerDecisionIndexes: number[];
  secondaryPlayerRandom: number[];
  firstPlayerGain: number[];
  firstPlayerCumulative: number[];
  firstPlayerAverage: number[];
}

export function simulateMatrixGame(
  matrix: number[][],
  firstPlayersOdds: number[],
  secondPlayersOdds: number[],
  numberOfGames: number = 50
): SimulationResult {
  const firstPlayerDecisionIndexes: number[] = [];
  const secondPlayerDecisionIndexes: number[] = [];

  const firstPlayerGain: number[] = [];
  const firstPlayerCumulativeGain: number[] = [];
  const firstPlayerAverageGain: number[] = [];

  const firstPlayerRandom: number[] = [];
  const secondaryPlayerRandom: number[] = [];

  for (let number = 1; number <= numberOfGames; number++) {
      const randomFirstPlayer = Math.random();
      const firstPlayerDecision = findSegmentIndex(
          randomFirstPlayer,
          firstPlayersOdds
      );
      const randomSecondaryPlayer = Math.random();
      const secondPlayerDecision = findSegmentIndex(
          randomSecondaryPlayer,
          secondPlayersOdds
      );

      firstPlayerDecisionIndexes.push(firstPlayerDecision);
      secondPlayerDecisionIndexes.push(secondPlayerDecision);

      firstPlayerRandom.push(randomFirstPlayer);
      secondaryPlayerRandom.push(randomSecondaryPlayer);

      firstPlayerGain.push(matrix[firstPlayerDecision][secondPlayerDecision]);
      firstPlayerCumulativeGain.push(
          (firstPlayerCumulativeGain.slice(-1)[0] || 0) + matrix[firstPlayerDecision][secondPlayerDecision]
      );
      firstPlayerAverageGain.push(firstPlayerCumulativeGain.slice(-1)[0] / number);
  }

  return {
      firstPlayerDecisionIndexes,
      firstPlayerRandom,
      secondPlayerDecisionIndexes,
      secondaryPlayerRandom,
      firstPlayerGain,
      firstPlayerCumulative: firstPlayerCumulativeGain,
      firstPlayerAverage: firstPlayerAverageGain
  };
}

export function printSimulation(simulation: SimulationResult, positionXY: positionXY) {
  console.log("№     | rand A    | name A   |   rand B   | name B   | gain   |  cumulative  |  average");
  for (let index = 0; index < simulation.firstPlayerDecisionIndexes.length; index++) {
      console.log(`${index + 1}        ${round(simulation.firstPlayerRandom[index])}        ${positionXY.top[simulation.firstPlayerDecisionIndexes[index]]}` +
          `          ${round(simulation.secondaryPlayerRandom[index])}        ${positionXY.left[simulation.secondPlayerDecisionIndexes[index]]}` +
          `         ${simulation.firstPlayerGain[index]}` +
          `        ${round(simulation.firstPlayerCumulative[index])}            ${round(simulation.firstPlayerAverage[index])}`);
  }
}

export function printSimulationResult(simulation: SimulationResult, positionXY: positionXY) {
  const firstPlayerDecisions: number[] = [];
  const secondPlayerDecisions: number[] = [];

  for (let index = 0; index < positionXY.left.length; index++) {
      firstPlayerDecisions.push(simulation.firstPlayerDecisionIndexes.filter((value) => value === index).length);
  }
  for (let index = 0; index < positionXY.top.length; index++) {
      secondPlayerDecisions.push(simulation.secondPlayerDecisionIndexes.filter((value) => value === index).length);
  }

  console.log();
  console.log("First player");
  console.log(firstPlayerDecisions.map((value) => round(value / simulation.firstPlayerDecisionIndexes.length)));

  console.log();
  console.log("Secondary player");
  console.log(secondPlayerDecisions.map((value) => round(value / simulation.secondPlayerDecisionIndexes.length)));

  console.log();
  console.log("Game price");
  console.log(simulation.firstPlayerAverage.slice(-1)[0]);
  console.log();
}

function round(input: number): number {
  return Math.round(input * 100) / 100;
}

export function findSegmentIndex(randomNumber: number = Math.random(), segments: number[]): number {
  let sum = 0;
  for (let index = 0; index < segments.length; index++) {
      sum += segments[index];
      if (randomNumber <= sum) {
          return index;
      }
  }
  return segments.length - 1;
}
