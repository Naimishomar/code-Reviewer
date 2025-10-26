import "./App.css";
import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import Editor from "react-simple-code-editor";
import axios from "axios";
import Markdown from "react-markdown";

function App() {
  const [open, setOpen] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState("");
  const [code, setCode] = useState(`function sum(){ 
    return 1+1; 
}`);
  useEffect(() => {
    prism.highlightAll();
  });

  const reviewCode = async () => {
    try {
      const response = await axios.post("http://localhost:3000/ai/get-review", {
        code,
      });
      setReview(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(true);
    }
  };

  const handleClick = () => {
    reviewCode();
    setLoading(true);
  };

  return (
    <>
      <main>
        <div className="opencode" onClick={() => setOpen("")}>
          <i className="ri-arrow-right-line"></i>
        </div>
        <div className="codeInput" style={{ display: open }}>
          <div className="closeCode" onClick={() => setOpen("none")}>
            <i className="ri-arrow-left-line"></i>
          </div>
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira Code", "Fira Mono", monospace',
                fontSize: 15,
                borderRadius: 5,
                width: "100%",
                height: "max-content",
                overflow: "auto",
                scrollbarWidth: "none",
                outline: "none",
              }}
            />
          </div>
          <div className="review-btn" onClick={handleClick}>
            <p>
              Review <i className="ri-arrow-right-line"></i>
            </p>
          </div>
        </div>

        <div className="codeReview" style={{ font: "monospace" }}>
          <h3 style={{ textAlign: "center", fontSize: "30px", color: "grey" }}>Review Code</h3>
          {loading ? (
            <p>Analysing your code...</p>
          ) : (
            <Markdown>{review}</Markdown>
          )}
          {error && (
            <p>❌Error occurred while analyzing code.Sorry for the inconvenience caused😢</p>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
