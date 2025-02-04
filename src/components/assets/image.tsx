import { actions } from "astro:actions";
import {
  createEffect,
  createSignal,
  Match,
  Suspense,
  Switch,
  type Component,
} from "solid-js";
import No_Data from "src/icons/no_data.svg?raw";

const Image: Component<{
  src: string;
  alt?: string;
  width?: number;
}> = (props) => {
  const src = () => props.src;
  const alt = () => props.alt;
  const width = () => props.width;

  const [image, setImage] = createSignal<string | undefined>();

  createEffect(async () => {
    const { data } = await actions.images.get({ path: src() });
    if (!data) return;
    setImage(URL.createObjectURL(new Blob(data)));
  });

  return (
    <Suspense
      fallback={<div class="bg-highlightHigh space-8 flex animate-pulse"></div>}
    >
      <Switch>
        <Match when={image()}>
          <img
            src={image() || No_Data}
            alt={alt() || "Image Alt not provided"}
            class="mx-auto"
            width={width()}
          />
        </Match>
      </Switch>
    </Suspense>
  );
};

export default Image;
