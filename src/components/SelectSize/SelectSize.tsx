import { FC, HTMLProps } from "react";

interface ISelectSize {
  selectProps?: HTMLProps<HTMLSelectElement>;
  optionProps?: HTMLProps<HTMLOptionElement>;
}

const SelectSize: FC<ISelectSize> = (selectProps, optionProps) => {
  return (
    <>
      <select
        name="sizeY"
        id="sizeY"
        defaultValue={2}
        className="rounded-lg border"
        {...selectProps}
      >
        {Array.from({ length: 9 }, (_, index) => (
          <option value={index + 1} {...optionProps}>
            {index + 1}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectSize;
