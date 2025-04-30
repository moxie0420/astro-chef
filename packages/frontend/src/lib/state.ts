import { Store } from "@tanstack/store";

export const Editing = new Store(false);
export const CurrentRecipe = new Store<string | undefined>(undefined);
