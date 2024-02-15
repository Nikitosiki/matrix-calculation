import { FC, HTMLProps } from "react";

interface ISelectSize {
  selectProps?: HTMLProps<HTMLSelectElement>;
  optionProps?: HTMLProps<HTMLOptionElement>;
  // selectProps?: DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;
  // optionProps?: DetailedHTMLProps<OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>;
}

const SelectSize: FC<ISelectSize> = ({ selectProps, optionProps }) => {
  return (
    <>
      <select
        name="size"
        id="size"
        defaultValue={2}
        className="rounded-lg border pl-1"
        onChange={(e) => {
          e.target.value;
        }}
        {...selectProps}
      >
        {Array.from({ length: 9 }, (_, index) => (
          <option key={index} value={index + 1} {...optionProps}>
            {index + 1}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectSize;
