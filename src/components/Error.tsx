import Button from "./Button";

interface Props {
  children: React.ReactNode;
}
const Error = ({ children }: Props) => {
  const refreshWindow = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col max-w-[calc(50vw)]">
      <h1 className="text-lg text-red-900 font-semibold mb-2">ERROR</h1>
      <div className="rounded-md border-2 border-red-900 bg-red-300 text-red-900 w-full p-4">
        <span>{JSON.stringify(children, null, 4)}</span>
      </div>
      <Button onClick={refreshWindow}>Refresh Page</Button>
    </div>
  );
};

export default Error;
