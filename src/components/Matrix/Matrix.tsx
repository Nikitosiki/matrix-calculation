import { FC } from "react";

// const styles = stylex.create({
//   table: {
//     border: "1px solid",
//     paddingHorizontal: "0.5rem",
//   },
// });

const Matrix: FC<{ value: number[][] }> = ({ value }) => {
  return (
    <>
      <table>
        <tbody>
          {value.map((row, rowIndex) => (
            <tr key={rowIndex} className="">
              {row.map((value, colIndex) => (
                <td key={colIndex} className="">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Matrix;
