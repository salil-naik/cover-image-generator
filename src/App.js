import { useState, useRef } from "react";
import style from "./app.module.scss";

import html2canvas from "html2canvas";

// components
import { Cover } from "./components/Cover/index";
import { Header } from "./components/Header/index";

function App() {
  const [name, setName] = useState("");
  const [headline, setHeadline] = useState("");
  const [highlights, setHighlights] = useState("");
  const [tagline, setTagline] = useState("");

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

  function handleForm(event) {
    const { name, value } = event.target;

    if (name === "name") setName(value);
    else if (name === "headline") setHeadline(value);
    else if (name === "highlights") setHighlights(value);
    else if (name === "tagline") setTagline(value);
  }

  return (
    <>
      <Header />
      <div className="grid-container">
        <form className={style.form}>
          <div className="grid-x grid-margin-x">
            <div className="cell large-3">
              <label htmlFor="name" className={style.label}>
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleForm}
                className={style.input}
                placeholder="Enter your name here"
              />
            </div>

            <div className="cell large-3">
              <label htmlFor="headline" className={style.label}>
                Headline
              </label>
              <input
                type="text"
                name="headline"
                value={headline}
                onChange={handleForm}
                className={style.input}
              />
            </div>

            <div className="cell large-3">
              <label htmlFor="highlights" className={style.label}>
                Highlights / Skills
              </label>
              <input
                type="text"
                name="highlights"
                value={highlights}
                onChange={handleForm}
                className={style.input}
              />
            </div>

            <div className="cell large-3">
              <label htmlFor="tagline" className={style.label}>
                Tagline / Mission
              </label>
              <input
                type="text"
                name="tagline"
                value={tagline}
                onChange={handleForm}
                className={style.input}
              />
            </div>
          </div>
        </form>

        <div className="cell large-12">
          <Cover
            name={name}
            headline={headline}
            highlights={highlights}
            tagline={tagline}
            coverRef={coverRef}
          />
        </div>

        <footer className={style.footer}>
          <div className="grid-container">
            <div className={style.flex}>
              <p>Designed and developed Salil Naik</p>
              <div className={style.button} onClick={downloadCover}>
                Downlaod Cover
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
