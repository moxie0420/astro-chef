import { createResource, Suspense, type Component } from "solid-js";

const Image: Component<{
  src: string | URL;
  alt?: string;
  width?: number;
}> = (props) => {
  const src = () => props.src;
  const alt = () => props.alt;
  const width = () => props.width;

  const [image] = createResource(async () =>
    fetch(`/api/image?path=${src()}`)
      .then((response) => response.blob())
      .then((blob) => URL.createObjectURL(blob)),
  );

  return (
    <Suspense
      fallback={<div class="flex animate-pulse space-y-4 space-x-4"></div>}
    >
      <img
        src={image()}
        alt={alt() || "Image Alt not provided"}
        class="mx-auto"
        width={width()}
      />
    </Suspense>
  );
};

export default Image;
