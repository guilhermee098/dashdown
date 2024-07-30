import React, { useState, useEffect } from "react";
import IconPlayer from "../IconPlayer/IconPlayer";
import FileUploadAnimation from "../../assets/animatedIcons/FileUpload.json";
import CheckIcon from "../../assets/animatedIcons/Check.json";
import LoaderIcon from "../../assets/animatedIcons/Loader.json";
import { useFile } from "../../context/FileContext";

function FileInput() {
  const { file, setFile, setMarkdown, showFileEditor, setShowFileEditor } =
    useFile();
  const [iconState, setIconState] = useState("in-upload");
  const [showCheckIcon, setShowCheckIcon] = useState(false);
  const [showLoaderIcon, setShowLoaderIcon] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [didWorkerRespond, setDidWorkerRespond] = useState(false);

  useEffect(() => {
    if (file && (file.name.endsWith(".htm") || file.name.endsWith(".html"))) {
      const worker = new Worker(
        new URL("../../server/webworkers/htmlToMarkdown.js", import.meta.url)
      );

      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target.result;
        const parser = new DOMParser();
        const doc = parser.parseFromString(fileContent, "text/html");
        const body = doc.body.innerHTML;
        worker.postMessage(body);
      };

      reader.readAsText(file);

      worker.onmessage = (event) => {
        setMarkdown(event.data);
        setDidWorkerRespond(true);
      };

      return () => {
        worker.terminate();
      };
    }
  }, [file, setMarkdown]);

  const handleMouseEnter = () => {
    console.log("iconState", iconState);
    if (iconState === "hover-upload-1" || iconState === "in-upload") {
      setIconState("");
      setTimeout(() => setIconState("hover-upload-1"), 0);
    }
  };

  const handleDragEnter = (event) => {
    setIconState("in-check-circle");
    event.preventDefault();
    if (!dragging) {
      setDragging(true);
      setTimeout(() => {
        setShowCheckIcon(true);
        setIconState("");
      }, 10);
    }
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    if (dragging) {
      const isInside = event.currentTarget.contains(event.relatedTarget);
      if (!isInside) {
        setDragging(false);
        setIconState("in-upload");
        setShowCheckIcon(false);
      }
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    setShowLoaderIcon(true);
    setShowCheckIcon(false);
    setIconState("loop-spin");

    const file = event.dataTransfer.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleLoaderComplete = () => {
    setShowLoaderIcon(false);
    setShowCheckIcon(true);
    setIconState("morph-check-in-1");
    if (didWorkerRespond) {
      setTimeout(() => {
        setShowFileEditor(true);
      }, 3000);
    }
  };

  function randomTimes(min, max) {
    return Math.random() * (max - min) + min;
  }

  return (
    <div
      className="w-full px-12 py-5 text-center bg-slate-900/40 ring-1 ring-white/10 rounded-xl"
      onMouseEnter={handleMouseEnter}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {showLoaderIcon ? (
        <IconPlayer
          className="flex items-center justify-center mx-auto"
          iconPath={LoaderIcon}
          size={"50px"}
          state={"loop-spin"}
          colorize={"#f3f4f6"}
          delay={0}
          repeatCount={randomTimes(0, 2)}
          onAllRepetitionsComplete={handleLoaderComplete}
        />
      ) : showCheckIcon ? (
        <IconPlayer
          className="flex items-center justify-center mx-auto"
          iconPath={CheckIcon}
          size={"50px"}
          state={iconState}
          colorize={"#f3f4f6"}
          delay={0}
        />
      ) : (
        <IconPlayer
          className="flex items-center justify-center mx-auto"
          iconPath={FileUploadAnimation}
          size={"50px"}
          state={iconState}
          colorize={"#f3f4f6"}
          delay={700}
        />
      )}
      <h3 className="mt-2 text-sm font-semibold select-none text-slate-100">
        {iconState === "in-check-circle"
          ? "Solte o arquivo aqui"
          : iconState === "loop-spin"
          ? "Processando arquivo ..."
          : iconState === "morph-check-in-1"
          ? file.name
          : "Nenhum arquivo selecionado"}
      </h3>
      <p className="mt-1 text-sm select-none text-slate-300">
        {iconState === "in-check-circle"
          ? "Solte seu .htm ou .html aqui"
          : iconState === "loop-spin"
          ? "São aceitos apenas arquivos .htm e .html por enquanto."
          : iconState === "morph-check-in-1"
          ? "Processamento concluído! Pronto para ser editado."
          : "Arraste e solte um arquivo aqui ou clique no botão abaixo"}
      </p>
      <div className="mt-6">
        <button type="button" className="btn" disabled={file}>
          Escolher arquivo
        </button>
      </div>
    </div>
  );
}

export default FileInput;
