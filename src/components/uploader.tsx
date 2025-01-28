import { createDropzone, createFileUploader } from "@solid-primitives/upload";
import { actions } from "astro:actions";
import { type Component, For } from "solid-js";

interface props {}

const Uploader: Component<props> = (props) => {
  const { files, selectFiles } = createFileUploader({
    multiple: true,
    accept: "image/*",
  });

  const { setRef: dropzoneRef, files: droppedFiles } = createDropzone({
    onDrop: async (files) => {
      const image = await files.map(async (file) => ({
        name: file.name,
        data: await file.file.arrayBuffer(),
      }));
    },
  });

  return (
    <div class="bg-overlay border-surface m-1 mx-auto max-w-sm rounded-md border-2 p-2">
      <button
        ref={dropzoneRef}
        class="shadow-base hover:bg-base mx-auto flex w-full max-w-sm flex-col rounded-md py-10 text-center"
        onClick={() =>
          selectFiles(async (files) => {
            await actions.uploadImage({
              image: files.map((file) => file.file),
            });
          })
        }
      >
        Drop files here or click to upload
      </button>
      <For each={files()}>{(item) => <p>{item.name}</p>}</For>
      <For each={droppedFiles()}>{(file) => <p>{file.name}</p>}</For>
    </div>
  );
};

export default Uploader;
