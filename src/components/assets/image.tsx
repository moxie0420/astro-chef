import type { Component } from "solid-js";

const Image: Component<{
  src: string;
  alt?: string;
}> = (props) => {
  const src = () => props.src;
  const alt = () => props.alt;

  return (
    <img
      src={`/api/image?path=${src()}`}
      alt={alt() || "Image Alt not provided"}
      class="mx-auto"
    />
  );
};

export default Image;
