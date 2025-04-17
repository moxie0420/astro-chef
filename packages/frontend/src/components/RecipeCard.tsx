import Recipes from '@lib/recipes';
import { Link } from '@tanstack/solid-router';
import { Image } from '@unpic/solid';
import { Show, type Component } from 'solid-js';

const Skeleton = () => (
  <div class="card card-border bg-base-100 w-72 h-88 shadow-sm">
    <div class="skeleton h-40" />
    <div class="card-body">
      <div class="card-title skeleton h-6 w-32" />
      <div class="skeleton h-4 " />
      <div class="skeleton h-4 " />
      <div class="skeleton h-4 " />
      <div class="skeleton h-4 " />
      <div class="skeleton h-4 " />
      <div class="card-actions justify-between">
        <div class="skeleton h-6 w-18 rounded-full" />
        <div class="flex gap-1">
          <div class="skeleton h-6 w-10 rounded-full" />
          <div class="skeleton h-6 w-10 rounded-full" />
        </div>
      </div>
    </div>
  </div>
);

const RecipeCard: Component<{ id: string }> = (props) => {
  const id = () => props.id;

  const recipe = Recipes.findOne({ id: id() });

  return (
    <Show when={recipe} fallback={<Skeleton />}>
      <Link
        to="/recipes/$recipeId"
        params={{
          recipeId: id(),
        }}
        class="carousel-item card card-border bg-base-100 w-72 h-88 shadow-sm"
      >
        <figure>
          <Image
            src={recipe?.image?.url || 'https://picsum.photos/800/400'}
            width={800}
            height={400}
            alt={recipe?.image?.description}
          />
        </figure>

        <div class="card-body  text-balance">
          <h2 class="card-title">{recipe?.title}</h2>
          <p>{recipe?.about?.description}</p>
          <div class="card-actions justify-between">
            <div class="badge badge-outline">By {recipe?.author}</div>
            {/** TODO: add recipe tags */}
          </div>
        </div>
      </Link>
    </Show>
  );
};

export default RecipeCard;
