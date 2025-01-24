import DOMPurify from "isomorphic-dompurify";
import { marked, type RendererObject } from "marked";

const renderer: RendererObject = {
  image({ href, text }) {
    return `<img src="/api/image?path=${href}" alt="${text}"  class="w-1/3 mx-auto" />`;
  },
};

async function genMd(text: string) {
  marked.use({ renderer });
  const md = await marked.parse(text);
  const clean = DOMPurify.sanitize(md);
  return clean;
}

export { genMd };
