import Button from "@components/Button";
import { createNewRecipe } from "@lib/state/recipes";
import type { recipeShape } from "@lib/validations";
import { createStore } from "solid-js/store";
import type { Recipe } from "src/entity/Recipe";
import Cancel from "src/icons/cancel.svg?component-solid";
import TextArea from "./inputs/TextArea";
import TextInput from "./inputs/TextInput";

const CreateForm = () => {
  const [newRecipe, setNewRecipe] = createStore<recipeShape>({
    author: "",
    title: "",
  });
  const submit = () => createNewRecipe(newRecipe as Recipe);

  return (
    <div class="flex flex-col">
      <TextInput
        value={newRecipe.title}
        placeholder="Geaneu's Hot German Potato Salad ..."
        onInput={(event) => setNewRecipe("title", event.currentTarget.value)}
      >
        Title
      </TextInput>

      <TextInput
        value={newRecipe.author}
        placeholder="Who created this gem??"
        onInput={(event) => setNewRecipe("author", event.currentTarget.value)}
      >
        Author
      </TextInput>

      <TextArea
        value={newRecipe.description}
        placeholder="Why should you make this?"
        onInput={(event) =>
          setNewRecipe("description", event.currentTarget.value)
        }
      >
        Description
      </TextArea>

      <div class="mt-2 flex w-full justify-between">
        <Button onClick={submit} type="submit" size="small">
          Submit
        </Button>
        <Button
          onClick={() => {
            setNewRecipe({});
          }}
          type="reset"
          size="small"
        >
          <Cancel />
        </Button>
      </div>
    </div>
  );
};
export default CreateForm;
