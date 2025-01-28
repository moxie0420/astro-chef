import { type Recipe } from "@lib/types";
import {
  createEffect,
  createSignal,
  Match,
  Show,
  Switch,
  type Component,
  type JSX,
} from "solid-js";
import { createStore } from "solid-js/store";

import Image from "@components/assets/image";
import LikeButton from "@components/likeButton";
import { actions } from "astro:actions";

const RecipeInfo: Component<{ recipe: Recipe; editing: boolean }> = (props) => {
  const editing = () => props.editing;

  const [recipe, setRecipe] = createStore(props.recipe);

  const [currentTitle, setCurrentTitle] = createSignal(recipe.title);
  const [currentAuthor, setCurrentAuthor] = createSignal(recipe.author);

  const updateRecipe: JSX.EventHandler<
    HTMLInputElement | HTMLTextAreaElement,
    Event
  > = (event) => {
    const key = event.currentTarget?.name as keyof Recipe;
    const val = event.currentTarget?.value;

    if (key && val && val !== "") {
      setRecipe(key, val);
    }
  };

  createEffect(async () => await actions.Recipe.updateRecipe(recipe));

  return (
    <div class="bg-overlay text-text m-2 mx-auto flex w-fit gap-1 rounded-md p-2">
      <div class="bg-highlightMed flex basis-1/3 flex-col gap-1 rounded-md p-1">
        <Switch>
          <Match when={!editing()}>
            <span class="basis-1/16 text-3xl font-bold">{currentTitle()}</span>
            <span class="basis-1/16 text-xl">By {currentAuthor()}</span>
            <p>Prep time : {recipe.prepTime}</p>
            <p>Cook time : {recipe.prepTime}</p>
            <p>{recipe.description}</p>
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

      <div class="flex basis-2/3 flex-col">
        <div class="mx-auto max-w-sm basis-2/3">
          <Image src="" alt="" />
        </div>

        <Show
          when={editing()}
          fallback={
            <div class="bg-highlightMed m-1 mx-auto max-w-full min-w-1/2 rounded-md text-center">
              {recipe.imageAlt}
            </div>
          }
        >
          <div class="mx-auto flex">
            <input
              type="text"
              name="image"
              value={recipe.image}
              class="bg-surface rounded-l-md"
              onChange={updateRecipe}
            />
            <input
              type="text"
              name="imageAlt"
              value={recipe.imageAlt}
              class="bg-surface rounded-r-md"
              onChange={updateRecipe}
            />
          </div>
        </Show>

        <div class="bg-highlightHigh relative mt-1 flex flex-col rounded-md p-2">
          <p>{recipe.totalViews} Views</p>
          <p>Created on {recipe.created?.toString()}</p>
          <p>Last edited on {recipe.edited?.toString()}</p>
          <div class="absolute top-0 right-1">
            <LikeButton liked={recipe.liked} recipeId={recipe.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeInfo;
