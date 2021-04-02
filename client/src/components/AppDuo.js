import React, { useState, useEffect } from "react";
import { Dropdown } from "semantic-ui-react";
import languages from "../utils/languages";
import styles from "./AppDuo.scss";
import * as ace from "ace-builds";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import AceEditor from "react-ace";

function getWindowDimensions() {
  const { innerWidth: width } = window;
  return {
    width,
  };
}

const AppDuo = ({ socket }) => {
  const { width } = getWindowDimensions();
  const [currentLang1, setCurrentLang1] = useState(languages[0].key);
  const [codeValue1, setCodeValue1] = useState(languages[0].template);
  const [currentLang2, setCurrentLang2] = useState(languages[0].key);
  const [codeValue2, setCodeValue2] = useState(languages[0].template);
  const [resizerPos, setResizerPos] = useState(`${0.5 * width}`);
  const [editor1, setEditor1] = useState(false);
  const [editor2, setEditor2] = useState(false);
  const [spectator, setSpectator] = useState(false);

  const dragEnd = (e) => {
    const posi = Math.min(0.7 * width, Math.max(0.3 * width, e.clientX));
    setResizerPos(posi);
    console.log(e.clientX);
  };

  const onDDChange1 = (e, data) => {
    const selectedVal = languages.filter((v) => v.key == data.value);
    setCurrentLang1(data.value);
    setCodeValue1(selectedVal[0].template);
  };

  const onDDChange2 = (e, data) => {
    const selectedVal = languages.filter((v) => v.key == data.value);
    setCurrentLang2(data.value);
    setCodeValue2(selectedVal[0].template);
  };

  useEffect(() => {
    socket.on("allow", (data) => {
      if (data.data.members[0] == socket.id) {
        setEditor1(true);
      } else if (data.data.members[1] == socket.id) {
        console.log(2);
        setEditor2(true);
      } else {
        setSpectator(true);
      }
    });
  });

  return (
    <div className="row">
      <div style={{ width: `${resizerPos}px` }}>
        <Dropdown
          placeholder="Languages"
          onChange={onDDChange1}
          selection
          value={currentLang1}
          options={languages}
        />
        <AceEditor
          style={{
            margin: "3rem auto",
            width: "inherit",
            height: "70vh",
          }}
          fontSize={18}
          mode="c_cpp"
          theme="github"
          readOnly={spectator || editor2 ? true : false}
          showPrintMargin={false}
          name="UNIQUE_ID_OF_DIV"
          value={codeValue1}
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
          }}
        />
      </div>
      <div
        className="resizer"
        style={{ left: `${resizerPos}px` }}
        draggable="true"
        onDragEnd={dragEnd}
      ></div>
      <div
        style={{ width: `${width - resizerPos - 10}px`, marginLeft: "10px" }}
      >
        <Dropdown
          placeholder="Languages"
          onChange={onDDChange2}
          selection
          value={currentLang2}
          options={languages}
        />
        <AceEditor
          style={{
            margin: "3rem auto",
            width: "inherit",
            height: "70vh",
          }}
          fontSize={18}
          mode="c_cpp"
          readOnly={spectator || editor1 ? true : false}
          theme="github"
          showPrintMargin={false}
          name="UNIQUE_ID_OF_DIV"
          value={codeValue2}
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
          }}
        />
      </div>
    </div>
  );
};
export default AppDuo;
