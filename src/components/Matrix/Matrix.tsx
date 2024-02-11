import { FC } from "react";

const Matrix: FC<{ value: number[][] | number[] }> = ({ value }) => {
  return (
    <>
      <table>
        <tbody>
          {value.map((rowVal, rowIndex) => (
            <tr key={rowIndex} className="border">
              {Array.isArray(rowVal) ? (
                rowVal.map((colVal, colIndex) => (
                  <td key={colIndex} className="min-w-8 border p-1 text-center">
                    {colVal}
                  </td>
                ))
              ) : (
                <td className="min-w-8 border p-1 text-center">{rowVal}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Matrix;
