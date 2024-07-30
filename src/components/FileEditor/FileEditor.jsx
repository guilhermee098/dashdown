import React, { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import IconPlayer from "../IconPlayer/IconPlayer";
import DownloadIcon from "../../assets/animatedIcons/Download.json";
import { useFile } from "../../context/FileContext";
import MarkdownViewer from "../MarkdownViewer/MarkdownViewer";
import { debounce } from "lodash";

function FileEditor() {
  const { markdown } = useFile();
  const [text, setText] = useState(markdown);
  const [iconState, setIconState] = useState("in-arrow-down");

  useEffect(() => {
    setText(markdown);
  }, [markdown]);

  const handleMarkdownChange = (e) => {
    setText(e.target.value);
  };

  // Debounce the Markdown change handler
  const debouncedHandleMarkdownChange = useCallback(
    debounce(handleMarkdownChange, 300),
    []
  );

  const handleChange = (e) => {
    debouncedHandleMarkdownChange(e);
  };

  const handleMouseEnter = () => {
    if (iconState === "hover-arrow-down-2" || iconState === "in-arrow-down") {
      setIconState("");
      setTimeout(() => setIconState("hover-arrow-down-2"), 0);
    }
  };

  return (
    <>
      <motion.div
        className="flex flex-col flex-1 w-full px-6 isolate text-slate-50 transform-gpu"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* 3 column wrapper */}
        <div className="flex flex-col flex-1 w-full h-full mx-auto mb-6 ml-1 lg:flex-row max-w-8xl">
          {/* Left sidebar & main wrapper */}
          <div className="flex flex-1 xl:flex-1">
            <div className="flex flex-col flex-1 pt-6 pr-4 my-2 lg:mr-3 bg-slate-900/70 ring-1 ring-white/10 rounded-xl sm:px-6 lg:pl-8 xl:pl-6 backdrop-filter backdrop-blur-2xl">
              <p className="font-semibold text-left select-none">Markdown</p>
              <div className="relative mt-3">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-slate-600" />
                </div>
              </div>
              <div className="flex flex-1 mt-4 mb-3">
                <textarea
                  name="markdown"
                  id="markdown"
                  className="w-full h-full bg-transparent resize-none focus:outline-none transform-gpu"
                  value={text}
                  onChange={handleMarkdownChange}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-1 py-6 pl-4 my-2 mr-1 bg-slate-900/70 lg:ml-3 ring-1 ring-white/10 rounded-xl lg:flex-shrink-0 lg:w-1/2 sm:px-6 lg:pr-8 xl:pr-6 backdrop-filter backdrop-blur-2xl">
            <p className="font-semibold text-left select-none">
              Pré-visualização
            </p>
            <button
              className="absolute top-3 right-6 btn"
              onMouseEnter={handleMouseEnter}
            >
              <IconPlayer
                iconPath={DownloadIcon}
                size={"24px"}
                colorize={"#f3f4f6"}
                state={iconState}
                className={"mr-2"}
              />
              Baixar
            </button>

            <div className="relative mt-3">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-slate-600" />
              </div>
            </div>
            <div className="flex flex-1 mt-4 mb-3 overflow-hidden">
              <div className="flex-1 h-full min-w-full overflow-y-auto prose prose-invert text-start transform-gpu">
                <div className="w-full h-full overflow-y-auto">
                  <MarkdownViewer text={text} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default FileEditor;
