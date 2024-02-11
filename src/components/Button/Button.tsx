import { FC, ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type buttonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button: FC<buttonProps> = (buttonProps) => {
  return (
    <button
      className={
        "rounded-lg border bg-purple-500 px-4 py-[0.33rem] text-white " +
        "font-semibold transition-all hover:scale-105 hover:bg-purple-600 active:scale-90"
      }
      {...buttonProps}
    >
      {buttonProps.value}
    </button>
  );
};

export default Button;
