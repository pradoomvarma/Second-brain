import { ReactElement } from "react";

export interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
}

const variantStyles = {
  primary: "bg-indigo-600 text-white",
  secondary: "bg-indigo-200 text-indigo-800",
};

const defaultStyles = "font-normal cursor-pointer transition-all duration-100";

const sizeStyles = {
  sm: "px-4 py-2 text-sm rounded-sm",
  md: "px-6 py-4 text-md rounded-md",
  lg: "px-8 py-6 text-lg rounded-lg",
};

export const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={`${variantStyles[props.variant]} ${defaultStyles} ${
        sizeStyles[props.size]
      } ${props.fullWidth ? " w-full flex justify-center items-center" : ""} ${props.loading ? "opacity-60" : ""}`}
      //  disabled={props.loading} 
    >
      <div className="flex items-center">
        {props.startIcon}
        <div className="pl-2 pr-2">{props.text}</div>
        {props.endIcon}
      </div>
    </button>
  );
};
