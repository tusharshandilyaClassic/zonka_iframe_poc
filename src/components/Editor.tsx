import { useEffect, useState } from "react";
import EditorInput from "./EditorInput";

interface Props {
  onValueChange?: (values: EditorFormValues) => void;
}

export interface EditorFormValues {
  [elemId: string]: string;
}

/**
 *
 * Future TODOs:
 *
 * 1. Make the editor input population dynamic based on data
 * 2. Add the option to add more options
 *
 */

const Editor = ({ onValueChange }: Props) => {
  const [values, setValues] = useState<EditorFormValues>({});

  useEffect(() => {
    if (onValueChange) {
      onValueChange(values);
    }
  }, [onValueChange, values]);

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
  };

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = evt.target;

    setValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="shadow-md p-4 rounded-md">
      <EditorInput id="question" onChange={handleInputChange}>
        Question
      </EditorInput>
      <EditorInput id="option-1" onChange={handleInputChange}>
        Option 1
      </EditorInput>
      <EditorInput id="option-2" onChange={handleInputChange}>
        Option 2
      </EditorInput>
      <EditorInput id="option-3" onChange={handleInputChange}>
        Option 3 (Inner HTML mis-match)
      </EditorInput>
      <EditorInput id="-" onChange={handleInputChange}>
        Option 4 (Bad Id)
      </EditorInput>
    </form>
  );
};

export default Editor;
