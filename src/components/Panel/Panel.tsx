import { FC, ReactNode } from "react";

interface IPanel {
  children?: ReactNode;
  className?: string;
}

const Panel: FC<IPanel> = ({ children, className }) => {
  return (
    <div
      className={
        "z-10 m-auto min-h-48 min-w-96 max-w-screen-xl p-4 " +
        "rounded-2xl bg-slate-50 shadow-lg " +
        "flex flex-col gap-4 " +
        className
      }
    >
      {children}
    </div>
  );
};

export default Panel;
