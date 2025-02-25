import { router } from "@lib/trpc";
import { imageRouter } from "./image";
import { ingredientRouter } from "./ingredient";
import { recipeRouter } from "./recipe";

const trpcRouter = router({
  recipe: recipeRouter,
  ingredient: ingredientRouter,
  image: imageRouter,
});
export { trpcRouter };

export type TRPCRouter = typeof trpcRouter;
