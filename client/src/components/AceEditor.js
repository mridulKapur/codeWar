import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";
import "../styles/editor.scss";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import { Autocomplete } from "ace-builds/src-noconflict/ext-language_tools";
import { Button, TextArea } from "semantic-ui-react";

let mode = ["c_cpp", "java", "python"];

const Editor = ({ spectator, editor1, editor2, codeValue, modeIndex, currentLang, socket }) => {
	const [code, setCode] = useState(codeValue);
	const [output, setOutput] = useState("");

  useEffect(() => {
		socket.on("ans", (data) => {
			setOutput(data.output);
    });
	}, []);

  useEffect(() => {
    console.log("in effect2")
		socket.on("reciveCode", (data) => {
      if (data.editor1 == editor1 && data.editor2 == editor2) {
        setCode(data.code);
      }
    });
	}, []);

  useEffect(() => {
    setCode(codeValue);
  },[codeValue])
  
	console.log(code);

	const runCode = () => {
		socket.emit("run", {
			code: code,
			language: currentLang,
			input: "",
		});
	};

  const sendCode = (e) => {
    console.log("lets send it!!");
    setCode(e);
		socket.emit("sendCode",{code:e,editor1:editor1,editor2:editor2});
	};

	return (
		<div>
			<AceEditor
				style={{
					margin: "1rem 1rem 0.8rem 0rem",
					width: "inherit",
					height: "70vh",
				}}
				fontSize={18}
				mode={mode[modeIndex]}
				theme='github'
				readOnly={spectator || (editor1 && editor2)}
				onChange={(e) => {
          sendCode(e);
				}}
				showPrintMargin={false}
				name='UNIQUE_ID_OF_DIV'
				value={code}
				editorProps={{ $blockScrolling: true }}
				setOptions={{
					enableBasicAutocompletion: true,
					enableLiveAutocompletion: true,
					enableSnippets: true,
				}}
			/>
			<div
				style={{ display: "flex", flexDirection: "row-reverse", width: "100%", margin: "1rem 0" }}>
				<Button className='runButton' onClick={runCode}>
					run
				</Button>
				<div style={{ display: "inline-flex", width: "80%", flexDirection: "row" }}>
					<TextArea placeholder='Input' />
					<TextArea value={output} placeholder='Output' />
				</div>
			</div>
		</div>
	);
};

export default Editor;
