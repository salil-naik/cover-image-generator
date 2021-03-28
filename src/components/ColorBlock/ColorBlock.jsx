import style from "./colorblock.module.scss";

export function ColorBlock(props) {
  return (
    <div
      className={style.button}
      style={{
        backgroundColor: props.color.bg,
        borderColor: props.color.border,
      }}
    ></div>
  );
}
