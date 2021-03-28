import { useState, useRef } from "react";
import style from "./app.module.scss";
import color from "./color-blocks.module.scss";

import html2canvas from "html2canvas";

// components
import { Cover } from "./components/Cover/index";
import { ColorBlock } from "./components/ColorBlock/index";

function App() {
  const [name, setName] = useState("");
  const [headline, setHeadline] = useState("");
  const [highlights, setHighlights] = useState("");
  const [tagline, setTagline] = useState("");
  const [bgColor, setBgColor] = useState("#161B22");
  const [borderColor, setBorderColor] = useState("#0F6D31");

  const coverRef = useRef(null);

  // function to download the cover image
  const downloadCover = () => {
    html2canvas(coverRef.current, {
      scrollX: -window.scrollX,
      scrollY: -window.scrollY,
    }).then((canvas) => {
      var img = canvas.toDataURL();
      let a = document.createElement("a");
      a.href = img;
      a.download = `${name===""?'unknown':name}'s-cover.png`;
      a.click();
    });
  };

  // function to handle the input elements
  function handleForm(event) {
    const { name, value } = event.target;

    if (name === "name") setName(value);
    else if (name === "headline") setHeadline(value);
    else if (name === "highlights") setHighlights(value);
    else if (name === "tagline") setTagline(value);
  }

  // function to change colours
  function changeColor(bg, border) {
    setBgColor(bg);
    setBorderColor(border);
  }

  // Array of color schemes
  let colorArr = [
    ["#161B22", "#0F6D31"],
    ["#5039A3", "#FC9776"],
    ["#060607", "#3D5FF8"],
    ["#172346", "#4FD0ED"],
    ["#292C31", "#E94C2B"],
  ];

  return (
    <>
      {/* FIXED ELEMENTS */}
      {/* github tag */}
      <a href="https://github.com/salil-naik/cover-image-generator" target="_blank" rel="noreferrer">
        <div className={style.ghTagContainer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={style.ghSvg}
          >
            {" "}
            <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6c0-0.4,0-0.9,0.2-1.3 C7.2,6.1,7.4,6,7.5,6c0,0,0.1,0,0.1,0C8.1,6.1,9.1,6.4,10,7.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3c0.9-0.9,2-1.2,2.5-1.3 c0,0,0.1,0,0.1,0c0.2,0,0.3,0.1,0.4,0.3C17,6.7,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4 c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3C22,6.1,16.9,1.4,10.9,2.1z" />
          </svg>
        </div>
      </a>

      {/* Cover Display */}
      <div className={style.coverWrapper}>
        <Cover
          name={name === "" ? "Your name here" : name}
          headline={headline === "" ? "Headline comes here" : headline}
          highlights={
            highlights === "" ? "Your highlights and achievements" : highlights
          }
          tagline={
            tagline === ""
              ? "A tagline, a quote or your goals/missions"
              : tagline
          }
          coverRef={coverRef}
          bgColor={bgColor}
          borderColor={borderColor}
        />
      </div>

      <footer className={style.footer}>
        <div className="grid-container">
          <div className={style.flex}>
            <p>
              Cover Image Generator{" "}
              <span style={{ fontSize: "12px", opacity: "0.7" }}>
                by{" "}
                <a href="https://github.com/salil-naik" target="_blank" rel="noreferrer">
                  Salil Naik
                </a>
              </span>
            </p>
            <div className={style.button} onClick={downloadCover}>
              Download Cover
            </div>
          </div>
        </div>
      </footer>

      {/* SCROLLABLE ELEMENTS */}

      <div className={style.scrollContainer}>
        <div className="grid-container">
          {/* Form */}
          <form className={style.form}>
            <div className="grid-x grid-margin-x">
              {[
                ["name", name],
                ["headline", headline],
                ["highlights", highlights],
                ["tagline", tagline],
              ].map((item, index) => {
                return (
                  <div className="cell large-3 medium-6" key={index}>
                    <label htmlFor={item[0]} className={style.label}>
                      {item[0]}
                    </label>
                    <input
                      type="text"
                      name={item[0]}
                      value={item[1]}
                      onChange={handleForm}
                      className={style.input}
                    />
                  </div>
                );
              })}
            </div>
          </form>

          {/* Color selection section*/}
          <div className="grid-x grid-margin-x">
            <div className="cell large-6">
              <div className={color.container}>
                <div className={color.railContainer}>
                  <div className={color.rail}>
                    {colorArr.map((colors, index) => {
                      return (
                        <div
                          onClick={() => {
                            changeColor(colors[0], colors[1]);
                          }}
                          key={index}
                        >
                          <ColorBlock
                            color={{ bg: colors[0], border: colors[1] }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
