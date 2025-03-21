import { closeMenu } from "@lib/state/menu";
import { trpc } from "@lib/trpc/client";
import {
  createDropzone,
  createFileUploader,
  type UploadFile,
} from "@solid-primitives/upload";
import { createSignal, For, type Component } from "solid-js";

const Uploader: Component = () => {
  const [filesToUpload, setFilesToUpload] = createSignal([] as UploadFile[]);

  const { selectFiles } = createFileUploader({
    multiple: true,
    accept: "image/*",
  });

  const { setRef: dropzoneRef } = createDropzone({
    onDrop: async (files) => {
      setFilesToUpload(files);
    },
  });

  const uploadFileArray = async (files: UploadFile[]) => {
    const upload = files.map((file) => file.file);

    const formData = new FormData();
    upload.forEach((file) => formData.append(file.name, file));

    const res = await trpc.image.upload.mutate(formData);
    if (!res) return;

    setFilesToUpload([]);
    closeMenu();
  };

  return (
    <div class="bg-overlay border-surface m-1 mx-auto flex max-w-sm flex-col rounded-md border-2 p-2">
      <button
        ref={dropzoneRef}
        class="shadow-base hover:bg-base mx-auto flex w-full max-w-sm flex-col rounded-md py-10 text-center"
        onClick={() =>
          selectFiles((files) => {
            setFilesToUpload(files);
          })
        }
      >
        Drop files here or click to upload
      </button>
      <div class="m-1 flex flex-wrap gap-1">
        <For each={filesToUpload()}>
          {(item) => (
            <p class="bg-highlightHigh max-w-sm rounded-full px-2 py-1">
              {item.name}
            </p>
          )}
        </For>
      </div>

      <button
        class="bg-pine mx-auto mt-1 w-full rounded-md text-xl font-bold"
        onClick={() => uploadFileArray(filesToUpload())}
      >
        Upload
      </button>
    </div>
  );
};

export default Uploader;
