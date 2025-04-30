import { createFileRoute } from "@tanstack/solid-router";
import { defineBasicExtension } from "prosekit/basic";
import { createEditor } from "prosekit/core";
import { ProseKit, useDocChange } from "prosekit/solid";

import "prosekit/basic/style.css";
import "prosekit/basic/typography.css";

import ActiveButton from "@components/ActiveButton";
import { useRecipe } from "../../../database/recipes";

export const Route = createFileRoute("/recipes/$recipeId/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  const { recipeId } = Route.useParams()();

  const [recipe, { setRecipe }] = useRecipe(recipeId);

  const extension = defineBasicExtension();
  const editor = createEditor({ extension, defaultContent: recipe.body });

  const save = () => {
    const html = editor.getDocHTML();
    setRecipe("body", html);
  };

  useDocChange(save, { editor });

  return (
    <div>
      <ProseKit editor={editor}>
        <div>
          <ActiveButton
            active={() => editor.nodes.heading.isActive({ level: 1 })}
            disabled={() => editor.commands.toggleHeading.canExec({ level: 1 })}
            onClick={() => editor.commands.toggleHeading({ level: 1 })}
          >
            H1
          </ActiveButton>
          <ActiveButton
            active={() => editor.nodes.heading.isActive({ level: 2 })}
            disabled={() => editor.commands.toggleHeading.canExec({ level: 2 })}
            onClick={() => editor.commands.toggleHeading({ level: 2 })}
          >
            H2
          </ActiveButton>
          <ActiveButton
            active={() => editor.nodes.heading.isActive({ level: 3 })}
            disabled={() => editor.commands.toggleHeading.canExec({ level: 3 })}
            onClick={() => editor.commands.toggleHeading({ level: 3 })}
          >
            H3
          </ActiveButton>
        </div>
        <div
          ref={editor.mount}
          class="rounded-box bg-base outline-accent m-1 p-1.5 outline"
        ></div>
      </ProseKit>
    </div>
  );
}
