import type { JSXElement } from "solid-js";
import "./style.css";

type props = {
  size?: "small" | "medium" | "large";
  name?: string;
  type?: "button" | "submit" | "reset";
  style?: "none" | "generic" | "submit" | "reset";
  onClick?: (event: Event & { currentTarget: HTMLButtonElement }) => void;
} & (
  | {
      text?: string;
      children?: never;
    }
  | {
      text?: never;
      children?: JSXElement;
    }
);

const determineStyle = (type: "button" | "submit" | "reset") => {
  switch (type) {
    case "button":
      return "generic";
    case "reset":
      return "reset";
    case "submit":
      return "submit";
  }
};

const Button = (props: props) => {
  const type = () => props.type || "button";
  const size = () => props.size || "medium";
  const style = () => props.style || determineStyle(type());

  return (
    <button
      name={props.name}
      type={props.type}
      class="btn"
      classList={{
        "bg-muted": style() === "generic",
        "bg-love": style() === "reset",
        "bg-pine": style() === "submit",
        "text-lg px-2 py-1": size() === "small",
        "text-xl px-3 py-2": size() === "medium",
        "text-2xl px-4 py-3": size() === "large",
      }}
      onClick={props.onClick}
    >
      {props.text || props.children}
    </button>
  );
};

export default Button;
