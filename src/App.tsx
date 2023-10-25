import { useRef, useState } from "react";
import Editor, { EditorFormValues } from "./components/Editor";

function App() {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleEditorChange = (values: EditorFormValues) => {
    const frame = iframeRef.current;
    if (iframeLoaded && frame) {
      updateFrameValues(frame, values);
    }
  };

  const refreshFrame = () => {
    if (iframeRef.current) {
      setIframeLoaded(false); // causes side effect - Editor reloads; TODO: find a cleaner/more predictable way to update "preview" iframe state
      iframeRef.current.contentWindow?.location.reload();
    }
  };

  return (
    <div className="flex w-screen p-4 gap-2">
      <div className="h-full">
        <div className="shadow-md rounded-md mb-4 p-2 flex flex-col">
          {iframeLoaded ? (
            <span className="text-green-600">Frame loaded</span>
          ) : (
            <span className="text-amber-600">Loading</span>
          )}
          <button
            disabled={!iframeLoaded}
            onClick={refreshFrame}
            className="border border-blue-500 bg-blue-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-blue-600 focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:pointer-events-none"
          >
            Refresh iframe
          </button>
        </div>

        <Editor onValueChange={handleEditorChange} />
      </div>

      {/* Preview frame */}
      <div className="shadow-md flex-1 rounded-md">
        <iframe
          ref={iframeRef}
          onLoad={() => setIframeLoaded(true)}
          src="/_data/preview.html"
          className="h-full w-full"
        ></iframe>
      </div>
    </div>
  );
}

export default App;

// UTILS

const updateFrameValues = (
  frame: HTMLIFrameElement,
  values: EditorFormValues,
) => {
  Object.entries(values).forEach(([id, value]) => {
    const innerDoc = getFrameDocument(frame);
    const elem = innerDoc?.getElementById(id);

    if (elem) {
      elem.innerHTML = value;
    }
  });
};

const getFrameDocument = (frame: HTMLIFrameElement) => {
  return frame.contentDocument
    ? frame.contentDocument
    : frame.contentWindow?.document;
};
