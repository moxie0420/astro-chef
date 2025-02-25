import { trpc } from "@lib/trpc/client";
import {
  createEffect,
  createSignal,
  Match,
  Suspense,
  Switch,
  type Component,
} from "solid-js";
import No_Data from "src/icons/no_data.svg";

const Image: Component<{
  src: string;
  alt?: string;
}> = (props) => {
  const src = () => props.src;
  const alt = () => props.alt;

  const [image, setImage] = createSignal<string | undefined>();

  createEffect(async () => {
    if (src() == "") return;
    const data = await trpc.image.fetch.query(src());
    if (!data) return;
    setImage(URL.createObjectURL(new Blob(data)));
  });

  return (
    <Suspense
      fallback={<div class="bg-highlightHigh space-8 flex animate-pulse"></div>}
    >
      <Switch>
        <Match when={!image()}>
          <img
            src={No_Data.src}
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
