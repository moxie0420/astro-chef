import { recipeShape, type recipeShapeType } from "@lib/validations";
import { createForm, zodForm } from "@modular-forms/solid";
import TextInput from "./inputs/TextInput";

export const RecipeEditor = () => {
  const [, { Form, Field }] = createForm<recipeShapeType>({
    validate: zodForm(recipeShape),
  });

  return (
    <Form>
      <div class="grid grid-cols-5 grid-rows-5">
        <div class="row-span-4"></div>
        <div class="col-span-2 row-start-5">
          <Field name="prepTime">
            {(field, props) => (
              <TextInput
                {...props}
                type="text"
                label="Prep Time"
                value={field.value}
                error={field.error}
              />
            )}
          </Field>
          <Field name="cookTime">
            {(field, props) => (
              <TextInput
                {...props}
                type="text"
                label="Prep Time"
                value={field.value}
                error={field.error}
              />
            )}
          </Field>
        </div>
      </div>
    </Form>
  );
};
