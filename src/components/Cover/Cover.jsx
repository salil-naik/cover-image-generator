import { useRef } from "react";
import style from "./cover.module.scss";
import html2canvas from "html2canvas";

export function Cover(props) {
  const coverRef = useRef(null);

  // function to download the cover image
  const downloadCover = () => {
    html2canvas(coverRef.current).then((canvas) => {
      var img = canvas.toDataURL();
      let a = document.createElement("a");
      a.href = img;
      a.download = `report.png`;
      a.click();
    });
  };

  return (
    <>
      <div
        className={style.cover}
        style={{ background: "#161B22", borderBottomColor: "#0F6D31" }}
        ref={coverRef}
      >
        <div className={style.name}>{props.data.name}</div>
        <div className={style.headline}>{props.data.headline}</div>
        <div className={style.rightContent}>
          <div className={style.tagline}>{props.data.tagline}</div>
          <div className={style.highlights}>{props.data.highlights}</div>
        </div>
      </div>
      <div onClick={downloadCover}>Downlaod Cover</div>
    </>
  );
}
