import { useState, useRef } from "react";
import style from "./app.module.scss";
import color from "./color-blocks.module.scss";

import html2canvas from "html2canvas";

// components
import { Cover } from "./components/Cover/index";
import { ColorBlock } from "./components/ColorBlock/index";
import { GithubTag } from "./components/GithubTag/index";

function App() {
  const [name, setName] = useState("");
  const [headline, setHeadline] = useState("");
  const [highlights, setHighlights] = useState("");
  const [tagline, setTagline] = useState("");
  const [bgColor, setBgColor] = useState("#161B22");
  const [borderColor, setBorderColor] = useState("#0F6D31");

  const coverRef = useRef(null);
  const duplicateCoverRef = useRef(null);

  const downloadCover = () => {
    // making a clone of the cover component
    const scaledCover = coverRef.current.cloneNode(true);

    // scaling the component to get a high defination image
    scaledCover.style.transform = "scale(2)";

    // hack to hide the element.
    scaledCover.style.position = "fixed";
    scaledCover.style.top = "0";
    scaledCover.style.left = "0";
    scaledCover.style.zIndex = "-10";

    // appending the duplicate element
    duplicateCoverRef.current.appendChild(scaledCover);

    html2canvas(scaledCover, {
      scrollX: -window.scrollX,
      scrollY: -window.scrollY,
    })
      .then((canvas) => {
        var img = canvas.toDataURL();
        let a = document.createElement("a");
        a.href = img;
        a.download = `${name === "" ? "unknown" : name}'s-cover.png`;
        a.click();

        // removing the duplicate element
        duplicateCoverRef.current.removeChild(scaledCover);
      })
      .catch(console.log);
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
      <GithubTag />

      <div ref={duplicateCoverRef}></div>

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
                <a
                  href="https://github.com/salil-naik"
                  target="_blank"
                  rel="noreferrer"
                >
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
