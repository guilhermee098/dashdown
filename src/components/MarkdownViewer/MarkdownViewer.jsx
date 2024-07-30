import { marked } from "marked";

function MarkdownViewer({ text }) {
  marked.setOptions({
    breaks: true,
    gfm: true,
  });

  return (
    <div
      dangerouslySetInnerHTML={{ __html: marked(text) }}
      className="w-full"
    ></div>
  );
}

export default MarkdownViewer;
