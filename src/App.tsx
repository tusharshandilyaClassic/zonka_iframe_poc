import { useCallback, useRef, useState } from "react";
import Editor, { EditorFormValues } from "./components/Editor";
import ErrorBoundary from "./components/ErrorBoundary";
import Error from "./components/Error";
import Button from "./components/Button";
import { DOC_SRCS } from "./config/app.config";

function App() {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [renderDoc, setRenderDoc] =
    useState<keyof typeof DOC_SRCS>("publicDir");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleEditorChange = useCallback(
    (values: EditorFormValues) => {
      const frame = iframeRef.current;
      if (iframeLoaded && frame) {
        updateFrameValues(frame, values);
      }
    },
    [iframeRef.current]
  );

  const refreshFrame = () => {
    if (iframeRef.current) {
      setIframeLoaded(false); // causes side effect - Editor reloads; TODO: find a cleaner/more predictable way to update "preview" iframe state
      iframeRef.current.contentWindow?.location.reload();
    }
  };

  const handleSelectChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    setIframeLoaded(false);
    setRenderDoc(evt.target.value as keyof typeof DOC_SRCS);
  };

  const currentDoc = DOC_SRCS[renderDoc];
  const showWarning = renderDoc !== "publicDir";

  return (
    <ErrorBoundary fallback={(error) => <Error>{error}</Error>}>
      <div className="flex w-screen p-4 gap-2">
        <div className="h-full basis-80 flex-grow-0">
          <div className="shadow-md rounded-md mb-4 p-2 flex flex-col">
            {iframeLoaded ? (
              <span className="text-green-600">Frame loaded</span>
            ) : (
              <span className="text-amber-600">Loading</span>
            )}
            <Button disabled={!iframeLoaded} onClick={refreshFrame}>
              Refresh iframe
            </Button>

            <select
              name="docSrc"
              onChange={handleSelectChange}
              className="border-2 border-gray-300 bg-white rounded-md px-2 py-1"
            >
              {Object.values(DOC_SRCS).map((option) => (
                <option value={option.id} key={option.src}>
                  {option.label}
                </option>
              ))}
            </select>

            {showWarning && (
              <h1 className="text-amber-600 my-2 font-semibold  text-justify">
                ⚠️ Changing data on non-same origin iframe will crash the page.
                (You can refresh it to bring it back)
              </h1>
            )}
          </div>

          <Editor onValueChange={handleEditorChange} />
        </div>

        {/* Preview frame */}
        <div className="shadow-md flex-1 rounded-md">
          {!iframeLoaded && <span className="text-amber-600">Loading</span>}
          <iframe
            ref={iframeRef}
            onLoad={() => setIframeLoaded(true)}
            src={currentDoc.src}
            className="h-full w-full"
          />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;

// UTILS

const updateFrameValues = (
  frame: HTMLIFrameElement,
  values: EditorFormValues
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
