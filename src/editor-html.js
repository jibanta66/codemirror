import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import './App.css';

export default function Editor() {
  const [htmlCode, setHtmlCode] = useState('<h1>Hello, world!</h1>');
  const [cssCode, setCssCode] = useState('h1 { color: red; }');
  const [jsCode, setJsCode] = useState("console.log('Hello, world!')");

  const [output, setOutput] = useState('');

  const runCode = () => {
    const iframe = document.getElementById('output-frame');
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    const head = iframeDoc.querySelector('head');
    const body = iframeDoc.querySelector('body');

    // Clear the iframe contents
    head.innerHTML = '';
    body.innerHTML = '';

    // Add the CSS code to the head
    const style = iframeDoc.createElement('style');
    style.innerHTML = cssCode;
    head.appendChild(style);

    // Add the HTML code to the body
    body.innerHTML = htmlCode;

    // Evaluate the JavaScript code
    try {
      eval(jsCode);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="container">
        <div className="editor">
          <h2>HTML</h2>
          <CodeMirror
            value={htmlCode}
            onChange={(value) => setHtmlCode(value)}
            options={{
              mode: 'xml',
              theme: 'default',
              lineNumbers: true
            }}
          />
        </div>
        <div className="editor">
          <h2>CSS</h2>
          <CodeMirror
            value={cssCode}
            onChange={(value) => setCssCode(value)}
            options={{
              mode: 'css',
              theme: 'default',
              lineNumbers: true
            }}
          />
        </div>
        <div className="editor">
          <h2>JavaScript</h2>
          <CodeMirror
            value={jsCode}
            onChange={(value) => setJsCode(value)}
            options={{
              mode: 'javascript',
              theme: 'default',
              lineNumbers: true
            }}
          />
        </div>
      </div>
      <div className="button-container">
        <button onClick={runCode}>Run</button>
      </div>
      <div className="editor output">
        <h2>Output</h2>
        <iframe id="output-frame" title="Output" />
      </div>
    </>
  );
}
