import clsx from "clsx";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const Button = ({ className, variant = "primary", ...rest }: Props) => {
  const css = clsx(
    "border text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:pointer-events-none",
    {
      "border-blue-500 bg-blue-500 hover:bg-blue-600 ": variant === "primary",
      "border-teal-500 bg-teal-500 hover:bg-teal-600 ": variant === "secondary",
    },
    className
  );

  return <button className={css} {...rest} />;
};

export default Button;
