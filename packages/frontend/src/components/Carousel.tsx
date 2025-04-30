import { JSXElement } from "solid-js";
import { createSlider } from "solid-slider";
import LineMdArrowRight from "~icons/line-md/arrow-right?width=48px&height=48px";
import LineMdArrowLeft from "~icons/line-md/arrow-left?width=48px&height=48px";

interface props {
  children: JSXElement;
}

export default function Carousel(props: props) {
  const [slider, { next, prev }] = createSlider({
    drag: true,
    slides: {
      perView: 3.5,
      spacing: 1,
    },
    loop: false,
  });

  return (
    <div class="bg-neutral rounded-box relative flex px-3">
      <div
        ref={slider}
        class="carousel h-96 w-full gap-1 overflow-x-auto overflow-y-clip p-4 px-8"
      >
        {props.children}
      </div>
      <div
        role="button"
        class="btn btn-ghost absolute inset-y-0 left-0 my-auto"
        onClick={prev}
      >
        <LineMdArrowLeft />
      </div>
      <div
        role="button"
        class="btn btn-ghost absolute inset-y-0 right-0 my-auto"
        onClick={next}
      >
        <LineMdArrowRight />
      </div>
    </div>
  );
}
