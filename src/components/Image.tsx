import { trpc } from "@lib/trpc/client";
import {
  createEffect,
  createResource,
  Suspense,
  type Component,
} from "solid-js";
import No_Data from "src/icons/no_data.svg";

const Image: Component<{
  src?: string;
  alt?: string;
}> = (props) => {
  const src = () => props.src;
  const alt = () => props.alt;

  const [image, { refetch }] = createResource(async (t) => {
    try {
      const data = await trpc.image.fetch.query(src() ?? null);
      return data;
    } catch (error) {
      return No_Data.src;
    }
  });

  createEffect(() => {
    if (src() && src() !== "") refetch;
  });

  return (
    <Suspense
      fallback={<div class="bg-highlightHigh space-8 flex animate-pulse"></div>}
    >
      <img
        src={image()}
        alt={alt() || "Image Alt not provided"}
        class="m-1 mx-auto h-44 w-full object-contain"
      />
    </Suspense>
  );
};

export default Image;
