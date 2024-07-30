/* eslint-disable no-restricted-globals */
import TurndownService from "turndown";
import { parseHTML } from "linkedom/worker";

const turndownService = new TurndownService({
  codeBlockStyle: "fenced",
});

// Adding a rule to handle <pre> tags specifically
turndownService.addRule("pre", {
  filter: "pre",
  replacement: function (content, node) {
    let code = node.textContent.replace(/\s+/g, " ").trim(); // Replace all whitespace characters with a single space, then trim

    // Remove unwanted characters immediately following the backticks
    if (!/^[a-zA-Z0-9!@#%$¨&*()_+]/.test(code.charAt(0))) {
      code = code.slice(1).trim();
    }

    return "```\n" + code + "\n```";
  },
});

turndownService.addRule("hr", {
  filter: "hr",
  replacement: function (content) {
    return "\n---\n";
  },
});

turndownService.addRule("br", {
  filter: "br",
  replacement: function (content) {
    return "  \n";
  },
});

turndownService.addRule("div", {
  filter: "div",
  replacement: function (content) {
    return "";
  },
});

turndownService.addRule("style", {
  filter: "style",
  replacement: function () {
    return "";
  },
});

turndownService.addRule("script", {
  filter: "script",
  replacement: function () {
    return "";
  },
});

turndownService.addRule("table", {
  filter: "table",
  replacement: function (content, node) {
    let table = "\n";
    const rows = Array.from(node.querySelectorAll("tr"));
    const colCount = rows[0].querySelectorAll("th, td").length;
    rows.forEach((rowNode, rowIndex) => {
      let row = "| ";
      Array.from(rowNode.querySelectorAll("th, td")).forEach((cellNode) => {
        if (cellNode.querySelector("pre")) {
          let code = cellNode
            .querySelector("pre")
            .textContent.replace(/\s+/g, " ")
            .trim(); // Replace all whitespace characters with a single space, then trim

          // Remove unwanted characters immediately following the backticks
          if (!/^[a-zA-Z0-9!@#%$¨&*()_+]/.test(code.charAt(0))) {
            code = code.slice(1).trim();
          }

          row += "```\n" + code + "\n```" + " | ";
        } else {
          row += cellNode.textContent.trim() + " | ";
        }
      });
      table += row + "\n";
      if (rowIndex === 0) {
        table += "| " + " --- |".repeat(colCount) + "\n"; // Add a header separator after the first row
      }
    });
    return table;
  },
});

self.addEventListener("message", (event) => {
  const html = event.data;

  const { document } = parseHTML(html);

  const markdown = turndownService.turndown(document);
  console.log(markdown);
  self.postMessage(markdown);
});
