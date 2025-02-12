import { type Recipe } from "@lib/recipe";
import {
  createContext,
  createSignal,
  Match,
  Show,
  Switch,
  type Component,
  type JSX,
} from "solid-js";
import { createStore } from "solid-js/store";

import LikeButton from "@components/likeButton";
import { actions } from "astro:actions";

import Image from "@components/assets/image";
import TextArea from "@components/forms/inputs/TextArea";
import TextInput from "@components/forms/inputs/TextInput";
import Title from "./title";

const recipeContext = createContext();

const RecipeInfo: Component<{ recipe: Recipe; editing: boolean }> = (props) => {
  const editing = () => props.editing;

  const [recipe, setRecipe] = createStore(props.recipe);
  const [currentImage, setCurrentImage] = createSignal(recipe.image);

  const updateRecipe: JSX.EventHandler<
    HTMLInputElement | HTMLTextAreaElement,
    Event
  > = (event) => {
    const key = event.currentTarget?.name as keyof Recipe;
    const val = event.currentTarget?.value;

    if (key && val && val !== "") {
      setRecipe(key, val);
      if (key == "image") setCurrentImage(val);
    }
    console.log(`${key}: ${val}`);
    actions.Recipe.updateRecipe(recipe);
  };

  return (
    <div class="bg-overlay text-text mx-auto flex max-w-2xl flex-col gap-1 rounded-md p-2 md:flex-row">
      <div class="bg-highlightMed flex basis-3/8 flex-col gap-1 rounded-md p-1">
        <Switch>
          <Match when={!editing()}>
            <span class="basis-1/16 text-3xl font-bold">
              {recipe.title || `"Untitled"`}
            </span>
            <span class="basis-1/16 text-xl">
              By {recipe.author || "No One"}
            </span>
            <p class="basis-full text-lg">{recipe.description}</p>
            <div class="bg-highlightHigh flex flex-col rounded-md p-1 text-nowrap">
              <p>Prep time: {recipe.prepTime}</p>
              <p>Cook time: {recipe.cookTime}</p>
            </div>
          </Match>
          <Match when={editing()}>
            <Title />

            <TextInput
              name="prepTime"
              value={recipe.prepTime}
              placeholder="Not Set Yet"
              onChange={updateRecipe}
            >
              Prep Time
            </TextInput>

            <TextInput
              name="cookTime"
              value={recipe.cookTime}
              placeholder="Not set yet"
              onChange={updateRecipe}
            >
              Cook Time
            </TextInput>

            <TextArea
              name="description"
              value={recipe.description}
              onChange={updateRecipe}
              placeholder="Not set yet"
            >
              Description
            </TextArea>
          </Match>
        </Switch>
      </div>

      <div class="flex basis-full flex-col">
        <div class="m-auto">
          <Image src={currentImage()} alt={recipe.imageAlt} />
        </div>

        <Show
          when={editing()}
          fallback={
            <div class="bg-highlightMed m-1 mx-auto max-w-full min-w-1/2 rounded-md text-center">
              {recipe.imageAlt}
            </div>
          }
        >
          <div class="mx-auto flex w-full max-w-sm flex-col gap-1">
            <TextInput
              name="image"
              value={recipe.image}
              onChange={updateRecipe}
            >
              Image Path
            </TextInput>
            <TextInput
              name="imageAlt"
              value={recipe.imageAlt}
              onChange={updateRecipe}
            >
              Image Description
            </TextInput>
          </div>
        </Show>

        <div class="bg-highlightHigh relative mt-1 flex flex-col rounded-md p-2">
          <p>{recipe.totalViews} Views</p>
          <p>
            Created on {recipe.created?.toLocaleDateString()} at{" "}
            {recipe.created?.toLocaleTimeString()}
          </p>
          <p>
            Last edited at {recipe.edited?.toLocaleTimeString()} on{" "}
            {recipe.edited?.toLocaleDateString()}
          </p>
          <div class="absolute top-0 right-1">
            <LikeButton liked={recipe.liked} recipeId={recipe.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeInfo;
