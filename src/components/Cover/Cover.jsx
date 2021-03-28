import style from "./cover.module.scss";

export function Cover({
  name,
  headline,
  highlights,
  tagline,
  coverRef,
  bgColor,
  borderColor,
}) {
  return (
    <>
      <div className="grid-container">
        <div
          className={style.cover}
          style={{ background: bgColor, borderBottomColor: borderColor }}
          ref={coverRef}
        >
          <div className={style.name}>{name}</div>
          <div className={style.headline}>{headline}</div>
          <div className={style.rightContent}>
            <div className={style.tagline}>{tagline}</div>
            <div className={style.highlights}>{highlights}</div>
          </div>
        </div>
      </div>
    </>
  );
}
