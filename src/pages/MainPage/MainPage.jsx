import React from "react";
import MainFrame from "../../components/MainFrame/MainFrame";
import BackgroundEffect from "../../components/BackgroundEffect/BackgroundEffect";
import Header from "../../components/Header/Header";
import FileEditor from "../../components/FileEditor/FileEditor";
import { useFile } from "../../context/FileContext";

function MainPage() {
  const { showFileEditor } = useFile();

  return (
    <>
      <div className="flex flex-col max-h-screen min-h-screen smallDesktop:overflow-hidden text-slate-100 bg-slate-900 isolate">
        <BackgroundEffect />
        <Header />
        <div className="flex flex-col flex-1 w-full h-full max-w-full max-h-full overflow-y-auto">
          {showFileEditor ? <FileEditor /> : <MainFrame />}
        </div>
      </div>
    </>
  );
}

export default MainPage;
