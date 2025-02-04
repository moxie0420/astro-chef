import { type Recipe } from "@lib/types";
import {
  createEffect,
  createSignal,
  lazy,
  Match,
  Show,
  Switch,
  type Component,
  type JSX,
} from "solid-js";
import { createStore } from "solid-js/store";

import LikeButton from "@components/likeButton";
import { actions } from "astro:actions";

const Image = lazy(async () => import("@components/assets/image"));

const RecipeInfo: Component<{ recipe: Recipe; editing: boolean }> = (props) => {
  let ImageRef: HTMLInputElement | undefined;

  const editing = () => props.editing;

  const [recipe, setRecipe] = createStore(props.recipe);

  const [currentTitle, setCurrentTitle] = createSignal(recipe.title);
  const [currentAuthor, setCurrentAuthor] = createSignal(recipe.author);
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
  };

  createEffect(async () => await actions.Recipe.updateRecipe(recipe));

  return (
    <div class="bg-overlay text-text mx-auto flex max-w-2xl flex-col gap-1 rounded-md p-2 md:flex-row">
      <div class="bg-highlightMed flex basis-3/8 flex-col gap-1 rounded-md p-1">
        <Switch>
          <Match when={!editing()}>
            <span class="basis-1/16 text-3xl font-bold">{currentTitle()}</span>
            <span class="basis-1/16 text-xl">By {currentAuthor()}</span>
            <p class="basis-full text-lg">{recipe.description}</p>
            <div class="bg-highlightHigh flex flex-col rounded-md p-1">
              <p>Prep time: {recipe.prepTime}</p>
              <p>Cook time: {recipe.prepTime}</p>
            </div>
          </Match>
          <Match when={editing()}>
            <label for="title" class="basis-1/16 text-3xl font-bold">
              {currentTitle()}
            </label>
            <label for="title" class="basis-1/16 text-xl">
              By {currentAuthor()}
            </label>
            <input
              type="text"
              name="title"
              value={currentTitle()}
              class="bg-surface rounded-md"
              onInput={(event) => setCurrentTitle(event.currentTarget.value)}
              onChange={updateRecipe}
              placeholder="Recipe Title"
            />
            <input
              type="text"
              name="author"
              value={currentAuthor()}
              class="bg-surface rounded-md"
              onInput={(event) => setCurrentAuthor(event.currentTarget.value)}
              onChange={updateRecipe}
              placeholder="Recipe Author"
            />

            <label for="prepTime">Prep Time</label>
            <input
              type="text"
              name="prepTime"
              value={recipe.prepTime}
              class="bg-surface rounded-md"
              onChange={updateRecipe}
              placeholder="Not Set Yet"
            />

            <label for="cookTime">Cook Time</label>
            <input
              type="text"
              name="cookTime"
              value={recipe.cookTime}
              class="bg-surface rounded-md"
              onChange={updateRecipe}
              placeholder="not set yet"
            />

            <label for="description">Description</label>
            <textarea
              name="description"
              value={recipe.description}
              class="bg-surface h-full rounded-md"
              onChange={updateRecipe}
              placeholder="Not set yet"
            />
          </Match>
        </Switch>
      </div>

      <div class="flex basis-full flex-col">
        <div class="mx-auto">
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
            <input
              type="text"
              name="image"
              value={recipe.image}
              class="bg-surface basis-1/2 rounded-md"
              onChange={updateRecipe}
            />
            <input
              type="text"
              name="imageAlt"
              value={recipe.imageAlt}
              class="bg-surface basis-1/2 rounded-md"
              onChange={updateRecipe}
            />
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
