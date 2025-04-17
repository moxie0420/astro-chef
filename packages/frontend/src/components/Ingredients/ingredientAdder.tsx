import { units } from "server/units/types.ts";
import Add from "client/icons/add.svg";
import { z } from "zod";
import { createForm, SubmitHandler, zodForm } from "@modular-forms/solid";
import TextInput from "@components/inputs/TextInput";
import Select from "@components/inputs/Select";
import { store } from "@pages/+client";
import RecipeManager from "@database/recipes";
import { Ingredient } from "@lib/validations/ingredient";

type IngredientForm = z.infer<typeof Ingredient>;

const IngredientAdder = () => {
  const recipeId = store.misc.currentRecipe;
  RecipeManager.read(recipeId);

  const [, { Form, Field }] = createForm<IngredientForm>({
    validate: zodForm(Ingredient),
  });

  const handleSubmit: SubmitHandler<IngredientForm> = async (values) => {};

  return (
    <Form class="flex h-full px-1 py-1 pb-1">
      <Field name="amount.fraction">
        {(field, props) => (
          <TextInput
            {...props}
            type="text"
            label="fraction amount"
            value={field.value}
            error={field.error}
            placeholder=" 1/2 "
          />
        )}
      </Field>

      <Field name="unit">
        {(field, props) => (
          <Select
            {...props}
            label="fraction amount"
            value={field.value || "none"}
            error={field.error}
            each={units.map((v) => [v, v])}
          />
        )}
      </Field>

      {/* name */}
      <Field name="name">
        {(field, props) => (
          <TextInput
            {...props}
            type="text"
            label="ingredient name"
            value={field.value}
            error={field.error}
            placeholder="Cranberries..."
          />
        )}
      </Field>

      <button type="submit">
        <Add width={20} class="text-pine bg-highlightMed m-1 rounded-full" />
      </button>
    </Form>
  );
};

export default IngredientAdder;
