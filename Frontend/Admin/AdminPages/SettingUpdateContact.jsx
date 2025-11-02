import React, { useRef, useState, useEffect } from "react";
import Header from "../Header";

export default function SettingUpdateContact() {
  const editorRef = useRef(null);
  const [html, setHtml] =
    useState(`<p><strong>Toll Free Number / WhatsApp - 0806 957 8467</strong></p>
<p><strong>Email - info.codeweb25@gmail.com</strong></p>
<p><strong>The app is going to be live on Play Store soon.</strong></p>`);
  const [selectionSaved, setSelectionSaved] = useState(null);

  useEffect(() => {
    // Set initial content
    if (editorRef.current) editorRef.current.innerHTML = html;
  }, []);

  // Save selection so we can reapply after prompts (links, font size etc.)
  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      setSelectionSaved(sel.getRangeAt(0));
    }
  };

  const restoreSelection = () => {
    const sel = window.getSelection();
    if (!selectionSaved || !sel) return;
    sel.removeAllRanges();
    sel.addRange(selectionSaved);
  };

  const exec = (command, value = null) => {
    editorRef.current && editorRef.current.focus();
    // restore selection if previously saved (useful after prompt)
    try {
      restoreSelection();
      document.execCommand(command, false, value);
      // update html state
      setHtml(editorRef.current.innerHTML);
    } catch (err) {
      console.warn("Command failed:", command, err);
    }
  };

  const handleLink = () => {
    saveSelection();
    const url = prompt(
      "Enter link URL (include http:// or https://):",
      "https://"
    );
    if (url) {
      restoreSelection();
      exec("createLink", url);
    }
  };

  const handleFontSize = () => {
    saveSelection();
    const size = prompt("Enter font size in px (e.g. 14):", "15");
    if (size) {
      restoreSelection();
      // Wrap selection in span with font-size
      try {
        restoreSelection();
        document.execCommand("fontSize", false, 7); // set big size as placeholder
        // then replace <font size="7"> with span style
        const htmlNow = editorRef.current.innerHTML;
        const replaced = htmlNow.replace(
          /<font size="7">(.*?)<\/font>/g,
          `<span style="font-size:${parseInt(size, 10)}px">$1</span>`
        );
        editorRef.current.innerHTML = replaced;
        setHtml(editorRef.current.innerHTML);
      } catch (e) {
        console.warn(e);
      }
    }
  };

  const handleImage = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      exec("insertImage", url);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Get the final HTML content
    const finalHtml = editorRef.current ? editorRef.current.innerHTML : html;
    // For demo: alert + console.log. Replace with API send as needed.
    alert("Contact details updated!");
    console.log("Submitted content:", finalHtml);
    // If you want to set state:
    setHtml(finalHtml);
  };

  const headerStyle = {
    backgroundColor: "#337ab7",
    color: "#fff",
    padding: "12px 20px",
    fontSize: "18px",
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
    fontFamily: "Arial, sans-serif",
  };

  const containerStyle = {
    margin: "20px",
    fontFamily: "Arial, sans-serif",
  };

  const boxStyle = {
    border: "1px solid #ddd",
    borderTop: "none",
    backgroundColor: "#fff",
    borderBottomLeftRadius: "4px",
    borderBottomRightRadius: "4px",
    padding: "0",
    overflow: "hidden",
  };

  const toolbarStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    padding: "10px",
    backgroundColor: "#337ab7",
    borderRadius: "0",
    alignItems: "center",
  };

  const tbtn = {
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.15)",
    color: "#fff",
    padding: "8px 10px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "13px",
  };

  const editorAreaStyle = {
    padding: "18px",
    minHeight: "220px",
    outline: "none",
    fontSize: "15px",
    lineHeight: "1.6",
    backgroundColor: "#fff",
  };

  const footerStyle = {
    padding: "16px",
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  };

  const submitBtnStyle = {
    backgroundColor: "#337ab7",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "10px 22px",
    fontSize: "15px",
    cursor: "pointer",
  };

  const secondaryBtnStyle = {
    backgroundColor: "#f5f5f5",
    color: "#333",
    border: "1px solid #ddd",
    borderRadius: "4px",
    padding: "9px 18px",
    fontSize: "14px",
    cursor: "pointer",
  };

  return (
    <>
      {" "}
      <Header />
      <div style={containerStyle}>
        <div style={headerStyle}>Update Contact</div>

        <div style={boxStyle}>
          {/* Toolbar */}
          <div style={toolbarStyle}>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button
                type="button"
                style={tbtn}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => exec("bold")}
                title="Bold"
              >
                B
              </button>
              <button
                type="button"
                style={tbtn}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => exec("italic")}
                title="Italic"
              >
                I
              </button>
              <button
                type="button"
                style={tbtn}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => exec("underline")}
                title="Underline"
              >
                U
              </button>

              <button
                type="button"
                style={tbtn}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => exec("insertUnorderedList")}
                title="Bullet list"
              >
                • List
              </button>
              <button
                type="button"
                style={tbtn}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => exec("insertOrderedList")}
                title="Numbered list"
              >
                1. List
              </button>

              <button
                type="button"
                style={tbtn}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => exec("justifyLeft")}
                title="Align left"
              >
                ⟵
              </button>
              <button
                type="button"
                style={tbtn}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => exec("justifyCenter")}
                title="Center"
              >
                ⤒
              </button>
              <button
                type="button"
                style={tbtn}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => exec("justifyRight")}
                title="Align right"
              >
                ⟶
              </button>

              <button
                type="button"
                style={tbtn}
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleLink}
                title="Insert link"
              >
                🔗 Link
              </button>

              <button
                type="button"
                style={tbtn}
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleImage}
                title="Insert image"
              >
                🖼 Image
              </button>

              <button
                type="button"
                style={tbtn}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => exec("undo")}
                title="Undo"
              >
                ↶
              </button>
              <button
                type="button"
                style={tbtn}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => exec("redo")}
                title="Redo"
              >
                ↷
              </button>

              <button
                type="button"
                style={tbtn}
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleFontSize}
                title="Font size"
              >
                A+
              </button>
            </div>

            {/* small spacer to push toolbar right actions to end */}
            <div style={{ flex: 1 }} />

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                type="button"
                style={{ ...tbtn, background: "rgba(255,255,255,0.08)" }}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  // Clear content and state
                  if (window.confirm("Clear all content?")) {
                    if (editorRef.current) editorRef.current.innerHTML = "";
                    setHtml("");
                  }
                }}
              >
                Clear
              </button>
            </div>
          </div>

          {/* Editor */}
          <div
            ref={editorRef}
            contentEditable
            onInput={() => setHtml(editorRef.current.innerHTML)}
            onMouseUp={saveSelection}
            onKeyUp={saveSelection}
            style={editorAreaStyle}
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {/* Footer/buttons */}
          <div style={footerStyle}>
            <button
              type="button"
              style={secondaryBtnStyle}
              onClick={() => {
                // revert to last saved html (simple demo)
                if (editorRef.current) editorRef.current.innerHTML = html;
              }}
            >
              Revert
            </button>
            <button type="button" style={submitBtnStyle} onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>{" "}
    </>
  );
}
