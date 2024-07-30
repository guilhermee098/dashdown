import React, { createContext, useState, useContext } from "react";

// Create a context for the file
const FileContext = createContext();

// Create a provider component
export const FileProvider = ({ children }) => {
  const [file, setFile] = useState(null);
  const [markdown, setMarkdown] = useState("");
  const [showFileEditor, setShowFileEditor] = useState(false);

  return (
    <FileContext.Provider
      value={{
        file,
        setFile,
        markdown,
        setMarkdown,
        showFileEditor,
        setShowFileEditor,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

// Custom hook to use the FileContext
export const useFile = () => {
  return useContext(FileContext);
};
