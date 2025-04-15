import { trpc } from "@lib/trpc/client";
import {
  createResource,
  Match,
  Suspense,
  Switch,
  type Component,
} from "solid-js";
import No_data from "src/icons/no_data.svg";

const Image: Component<{
  src?: string;
  alt?: string;
}> = (props) => {
  const src = () => props.src;
  const alt = () => props.alt;

  const imageNotFoundError = new Error("Image was not found");

  const [image] = createResource(src(), async (src) => {
    if (src == "") throw imageNotFoundError;

    const data = await trpc.image.fetch.query(src);
    if (!data) throw imageNotFoundError;

    if (data instanceof Blob) return URL.createObjectURL(data);
    if (typeof data === "string") return data;
  });

  return (
    <Suspense
      fallback={
        <div class="bg-highlightHigh space-8 flex size-full animate-pulse"></div>
      }
    >
      <Switch>
        <Match when={image.error}>
          <img
            src={No_data.src}
            alt={alt() || "Image Alt not provided"}
            class="m-1 mx-auto h-44 w-full object-contain"
          />
        </Match>
        <Match when={image()}>
          <img
            src={image()}
            alt={alt() || "Image Alt not provided"}
            class="m-1 mx-auto h-44 w-full object-contain"
          />
        </Match>
      </Switch>
    </Suspense>
  );
};

export default Image;
