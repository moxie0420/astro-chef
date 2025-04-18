import { JSXElement } from "solid-js";
import { createSlider } from "solid-slider";

interface props {
  children: JSXElement;
}

export default function Carousel(props: props) {
  const [slider] = createSlider({
    drag: true,
    slides: {
      perView: 3.5,
    },
    loop: false,
  });

  return (
    <div class="relative">
      <div
        ref={slider}
        class="carousel bg-neutral rounded-box p-4 w-full h-96 gap-1"
      >
        {props.children}
      </div>
    </div>
  );
}
