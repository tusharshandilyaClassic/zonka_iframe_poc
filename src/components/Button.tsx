import clsx from "clsx";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ className, ...rest }: Props) => {
  const css = clsx(
    "border border-blue-500 bg-blue-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-blue-600 focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:pointer-events-none",
    className
  );
  return <button className={css} {...rest} />;
};

export default Button;
