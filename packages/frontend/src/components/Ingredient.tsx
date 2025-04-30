import { IngredientType } from "@lib/validations";
import { destructure } from "@solid-primitives/destructure";

interface props {
  ingredient: IngredientType;
}

export default function Ingredient(props: props) {
  const { name, amount, unit } = destructure(props.ingredient);

  return (
    <li class="list-row">
      <input type="checkbox" class="checkbox checkbox-neutral" />
      <div>{name()}</div>
      <div>
        <div>
          {amount().fraction} {unit()}
        </div>
        <div>{amount().decimal}</div>
      </div>
    </li>
  );
}
