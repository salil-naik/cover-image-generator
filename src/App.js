import { useState, useRef } from "react";
import style from "./app.module.scss";
import color from "./color-blocks.module.scss";

import html2canvas from "html2canvas";

// components
import { Cover } from "./components/Cover/index";
import { Header } from "./components/Header/index";
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
    html2canvas(coverRef.current).then((canvas) => {
      var img = canvas.toDataURL();
      let a = document.createElement("a");
      a.href = img;
      a.download = `report.png`;
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

  let colorArr = [
    ["#161B22", "#0F6D31"],
    ["#5039A3", "#FC9776"],
    ["#060607", "#3D5FF8"],
    ["#172346", "#4FD0ED"],
    ["#292C31", "#E94C2B"]
  ];

  return (
    <>
      <Header />

      <div className="grid-container">
        {/* Form */}
        <form className={style.form}>
          <div className="grid-x grid-margin-x">
            {[
              ["name", name],
              ["headline", headline],
              ["highlights", highlights],
              ["tagline", tagline],
            ].map((item) => {
              return (
                <div className="cell large-3">
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

        <div className="grid-x grid-margin-x">
          {/* Cover Display */}
          <div className="cell large-12">
            <Cover
              name={name}
              headline={headline}
              highlights={highlights}
              tagline={tagline}
              coverRef={coverRef}
              bgColor={bgColor}
              borderColor={borderColor}
            />
          </div>

          {/* Color selection */}
          <div className="cell large-6">
            <div className={color.container}>
              <h3 className={color.title}>Choose colors</h3>
              <div className={color.railContainer}>
                <div className={color.rail}>
                  {colorArr.map((colors) => {
                    return (
                      <div
                        onClick={() => {
                          changeColor(colors[0], colors[1]);
                        }}
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

        <footer className={style.footer}>
          <div className="grid-container">
            <div className={style.flex}>
              <p>Designed and developed Salil Naik</p>
              <div className={style.button} onClick={downloadCover}>
                Download Cover
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
