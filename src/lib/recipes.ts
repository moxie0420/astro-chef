import { actions } from "astro:actions";

class recipe extends HTMLElement {
  connectedCallback() {
    const listId = this.dataset.listId as string;
    const recipeId = this.dataset.recipeId as string;

    this.querySelector("div[id=delete]")?.addEventListener(
      "click",
      async () => {
        await actions.lists.removeRecipe({
          listId: parseInt(listId),
          recipeId: parseInt(recipeId),
        });
        location.reload();
      }
    );
  }
}
customElements.define("recipe-holder", recipe);
