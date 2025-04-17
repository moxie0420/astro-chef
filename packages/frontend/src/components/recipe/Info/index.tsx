import { RecipeEditor } from '@components/forms/RecipeEditor';
import Image from '@components/RecipeImage';
import LikeButton from '@components/likeButton';
import { Match, Switch } from 'solid-js';

const RecipeInfo = () => {
  const editing = store.misc.editing;
  const id = store.misc.currentRecipe;
  const recipe = store.recipes.find((v) => v.id === id);

  return (
    <Switch>
      <Match when={!editing}>
        <div class="bg-overlay text-text mx-auto flex max-w-2xl flex-col gap-1 rounded-md p-2 md:flex-row">
          <div class="bg-highlightMed flex basis-3/8 flex-col gap-1 rounded-md p-1">
            <span class="basis-1/16 text-3xl font-bold">
              {recipe.title || `"Untitled"`}
            </span>
            <span class="basis-1/16 text-xl">
              By {recipe.author || 'No One'}
            </span>
            <p class="basis-full text-lg">{recipe.about.description}</p>
            <div class="bg-highlightHigh flex flex-col rounded-md p-1 text-nowrap">
              <p>Prep time: {recipe.about.prepTime}</p>
              <p>Cook time: {recipe.about.cookTime}</p>
            </div>
          </div>

          <div class="flex basis-full flex-col">
            <div class="m-auto">
              <Image src={recipe.image.url} alt={recipe.image.description} />
            </div>

            <div class="bg-highlightMed m-1 mx-auto max-w-full min-w-1/2 rounded-md text-center">
              {recipe.image.description}
            </div>

            <div class="bg-highlightHigh relative mt-1 flex flex-col rounded-md p-2">
              <p>Created on {recipe.created.toDateString()}</p>
              <p>
                Last edited at {recipe.edited.toLocaleTimeString()} on{' '}
                {recipe.edited.toLocaleDateString()}
              </p>
              <div class="absolute top-0 right-1">
                <LikeButton recipeId={id} liked={recipe.liked} />
              </div>
            </div>
          </div>
        </div>
      </Match>
      <Match when={editing}>
        <RecipeEditor />
      </Match>
    </Switch>
  );
};

export default RecipeInfo;
