import { useState } from "react";

export default function Accordion(props) {
  const [isShowing, setIsShowing] = useState(false);

  const toggle = () => {
    setIsShowing(!isShowing);
  };

  return (
    <div
      style={{
        width: "100%",
        marginBottom: "15px",
        lineHeight: "15px"
      }}
    >
      <button
        style={{
          width: "100%",
          position: "relative",
          textAlign: "left",
          padding: "4px",
          border: "none",
          background: "transparent",
          outline: "none",
          cursor: "pointer"
        }}
        onClick={toggle}
        type="button"
      >
      {props.title}
      </button>
      {/* <div
        style={{ display: isShowing ? "block" : "none", padding: "5px" }}
        dangerouslySetInnerHTML={{
          __html: props.content
        }}
      /> */}
      <div
        style={{ display: isShowing ? "block" : "none", padding: "5px" }}
      >
        {props.content}
      </div>
    </div>
  );
}
