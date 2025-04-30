import { destructure } from "@solid-primitives/destructure";
import { ParentProps } from "solid-js";

interface props extends ParentProps {
  active: () => boolean;
  disabled?: () => boolean;
  onClick: () => void;
}

export default function ActiveButton(props: props) {
  const { active, disabled, onClick, children } = destructure(props);

  return (
    <button
      data-state={active() ? "on" : "off"}
      disabled={disabled?.()?.()}
      onClick={() => onClick()}
      onMouseDown={(event) => event.preventDefault()}
      class="btn"
    >
      {!children}
    </button>
  );
}
