import { useEffect, useState } from "react";
import Button from "../Button/Button";
import Matrix from "../Matrix/Matrix";
import SelectSize from "../SelectSize/SelectSize";
import Panel from "../Panel/Panel";
import Result from "../Result/Result";

function App() {
  const [sizeMatrix, setSizeMatrix] = useState({ x: 2, y: 2 });
  const [range, setRange] = useState({ from: 0, to: 99 });
  const [matrixA, setMatrixA] = useState<number[][]>([
    [0, 0],
    [0, 0],
  ]);
  const [matrixB, setMatrixB] = useState<number[]>([0, 0]);

  useEffect(() => {
    updateMatrix();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sizeMatrix]);

  const updateMatrix = () => {
    setMatrixA((current) => {
      const newMatrix: number[][] = [];

      for (let i = 0; i < sizeMatrix.y; i++) {
        const newRow: number[] = [];
        for (let j = 0; j < sizeMatrix.x; j++) {
          newRow.push(current[i]?.[j] || 0);
        }
        newMatrix.push(newRow);
      }

      return newMatrix;
    });

    setMatrixB((current) => {
      const newMatrix: number[] = [];

      for (let i = 0; i < sizeMatrix.y; i++) {
        newMatrix.push(current[i] || 0);
      }

      return newMatrix;
    });
  };

  const generateMatrix = () => {
    setMatrixA(() => {
      const newMatrix: number[][] = [];

      for (let i = 0; i < sizeMatrix.y; i++) {
        const newRow: number[] = [];
        for (let j = 0; j < sizeMatrix.x; j++) {
          newRow.push(
            Math.round(Math.random() * (range.to - range.from)) + range.from,
          );
        }
        newMatrix.push(newRow);
      }

      return newMatrix;
    });

    setMatrixB(() => {
      const newMatrix: number[] = [];

      for (let i = 0; i < sizeMatrix.y; i++) {
        newMatrix.push(
          Math.round(Math.random() * (range.to - range.from)) + range.from,
        );
      }

      return newMatrix;
    });
  };


  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-100 py-10">
        <h1 className="p-2 text-center text-3xl">Jordan elimination method</h1>
        <div className="relative flex  gap-8">
          <div className="absolute -right-14 z-0 size-36 rounded-full bg-purple-500 blur-3xl" />
          <div className="blur-1xl absolute -bottom-5 -left-5 z-0 size-48 rounded-[2rem] bg-purple-500/40 blur-3xl" />
          <Panel className="m-0">
            <h2 className="p-2 text-center text-xl font-medium">
              Matrix A & B
            </h2>

            <div className="flex flex-row flex-wrap justify-between gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center gap-2">
                  <p>Size: </p>
                  <SelectSize
                    selectProps={{
                      onChange: (e) =>
                        setSizeMatrix({
                          x: sizeMatrix.x,
                          y: Number(e.currentTarget.value),
                        }),
                    }}
                  />
                  <p> x </p>
                  <SelectSize
                    selectProps={{
                      onChange: (e) =>
                        setSizeMatrix({
                          x: Number(e.currentTarget.value),
                          y: sizeMatrix.y,
                        }),
                    }}
                  />
                </div>
                <div className="mb-auto flex flex-row items-center gap-2">
                  <p>From</p>
                  <input
                    type="number"
                    className="w-12 rounded-lg border pl-1"
                    defaultValue={0}
                    onChange={(e) => {
                      setRange({
                        from: Number(e.currentTarget.value),
                        to: range.to,
                      });
                    }}
                  />
                  <p>to</p>
                  <input
                    type="number"
                    className="w-12 rounded-lg border pl-1"
                    defaultValue={99}
                    onChange={(e) => {
                      setRange({
                        from: range.from,
                        to: Number(e.currentTarget.value),
                      });
                    }}
                  />
                </div>
                <Button value={"Generate"} onClick={generateMatrix} />
              </div>
              <div>
                {/* <p className="p-2 font-bold">A</p> */}
                <Matrix value={matrixA} />
              </div>
              <div>
                {/* <p className="p-2 font-bold">B</p> */}
                <Matrix value={matrixB} />
              </div>
            </div>
          </Panel>
        </div>
        <div>
          <p className="max-w-screen-md text-gray-500">
            <Result matrixA={matrixA} matrixB={matrixB} />
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
