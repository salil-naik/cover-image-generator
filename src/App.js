import { useState } from "react";
import { Cover } from "./components/Cover/index";
import style from "./app.module.css";

function App() {
  const [name, setName] = useState("");
  const [headline, setHeadline] = useState("");
  const [highlights, setHighlights] = useState("");
  const [tagline, setTagline] = useState("");

  const data = {
    name: name,
    headline: headline,
    highlights: highlights,
    tagline: tagline,
  };

  function handleForm(event) {
    const { name, value } = event.target;

    if (name === "name") setName(value);
    else if (name === "headline") setHeadline(value);
    else if (name === "highlights") setHighlights(value);
    else if (name === "tagline") setTagline(value);
  }

  return (
    <div className="grid-container">
      <form>
        <div className="grid-x grid-margin-x">
          <div className="cell large-4">
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleForm}
              placeholder="Enter your name"
              className={style.input}
            />
          </div>

          <div className="cell large-4">
            <input
              type="text"
              name="headline"
              value={headline}
              onChange={handleForm}
              placeholder="Enter the headline"
              className={style.input}
            />
          </div>

          <div className="cell large-4">
            <input
              type="text"
              name="highlights"
              value={highlights}
              onChange={handleForm}
              placeholder="Enter highlights"
              className={style.input}
            />
          </div>

          <div className="cell large-4">
            <input
              type="text"
              name="tagline"
              value={tagline}
              onChange={handleForm}
              placeholder="Enter tagline"
              className={style.input}
            />
          </div>
        </div>
      </form>

      <Cover data={data} />
    </div>
  );
}

export default App;
