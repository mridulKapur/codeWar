import React, { useState, useEffect } from "react";
import { Dropdown } from "semantic-ui-react";

import languages from "../utils/languages";
import "../styles/AppDuo.scss";
//editor
import Editor from "./AceEditor";

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
    // console.log(e.clientX);
  };

  const onDDChange1 = (e, data) => {
    const selectedVal = languages.filter((v) => v.key === data.value);
    setCurrentLang1(data.value);
    setCodeValue1(selectedVal[0].template);
  };

  const onDDChange2 = (e, data) => {
    const selectedVal = languages.filter((v) => v.key === data.value);
    setCurrentLang2(data.value);
    setCodeValue2(selectedVal[0].template);
  };

  useEffect(() => {
    socket.on("allow", (data) => {
      if (data.data.members[0] === socket.id) {
        setEditor1(true);
      } else if (data.data.members[1] === socket.id) {
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
          style={{
            margin: "1rem 1rem 0rem 1rem",
            borderRadius: "1rem",
          }}
          placeholder="Languages"
          onChange={onDDChange1}
          selection
          value={currentLang1}
          options={languages}
        />
        <Editor spectator={spectator} editor={editor2} codeValue={codeValue1} />
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
          style={{
            margin: "1rem 1rem 0rem 1rem",
            borderRadius: "1rem",
          }}
          placeholder="Languages"
          onChange={onDDChange2}
          selection
          value={currentLang2}
          options={languages}
        />
        <Editor spectator={spectator} editor={editor1} codeValue={codeValue2} />
      </div>
    </div>
  );
};
export default AppDuo;
