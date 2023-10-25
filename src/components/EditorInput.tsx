import clsx from "clsx";
import { useId } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode;
}

const EditorInput = ({ children, id, className, ...rest }: Props) => {
  const autoId = useId();
  const elemId = id ? id : autoId;

  const css = clsx("border-2 border-gray-300 rounded-md px-2 py-1", className);

  return (
    <label htmlFor={elemId} className="flex flex-col mb-4">
      {children}
      <input className={css} id={elemId} {...rest} />
    </label>
  );
};

export default EditorInput;
