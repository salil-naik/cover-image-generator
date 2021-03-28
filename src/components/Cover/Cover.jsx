import style from "./cover.module.scss";

export function Cover({name, headline, highlights, tagline, coverRef}) {
  return (
    <>
      <div
        className={style.cover}
        style={{ background: "#161B22", borderBottomColor: "#0F6D31" }}
        ref={coverRef}
      >
        <div className={style.name}>{name}</div>
        <div className={style.headline}>{headline}</div>
        <div className={style.rightContent}>
          <div className={style.tagline}>{tagline}</div>
          <div className={style.highlights}>{highlights}</div>
        </div>
      </div>
    </>
  );
}
