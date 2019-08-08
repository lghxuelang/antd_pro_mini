import React, { useRef, useEffect } from "react";
import { connect } from "dva";
import { INIT_MAP, INIT_CURTAIN_MAP } from "@/consts/map-types";
import styles from "./index.less";

const Curtain = ({ dispatch }) => {
  const mapLeft = useRef(null);
  const mapRight = useRef(null);
  const linemove = useRef(null);
  const splitsDom = useRef(null);
  useEffect(() => {
    dispatch({
      type: INIT_CURTAIN_MAP,
      payload: { container: mapLeft.current }
    });
  });
  const handleMouseDown = e => {
    //onMouseDown
    const Drag = linemove.current;
    const Spdom = splitsDom.current;
    const ev = event || window.event;
    event.stopPropagation();
    const disX = ev.clientX - Drag.offsetLeft;
    document.onmousemove = function(event) {
      const ev = event || window.event;
      Drag.style.left = ev.clientX - disX + "px";
      Drag.style.cursor = "move";
      Spdom.style.clip = "rect(0px, " + ev.clientX + "px" + ", 1000px , 0px)";
    };
  };
  const handleMouseUp = e => {
    e.preventDefault();
    document.onmousemove = null;
    const Drag = linemove.current;
    Drag.style.cursor = "default";
  };
  return (
    <div style={{ flex: "auto" }}>
      <div ref={mapLeft} className={styles.mapdiv}>
        <div
          className={styles.leftSlider}
          ref={linemove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        ></div>
        <div ref={splitsDom} className={styles.viewrollDiv} />
      </div>
    </div>
  );
};
export default connect(({ map }) => {
  map;
})(Curtain);
