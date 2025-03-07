import { recipeShape, type recipeShapeType } from "@lib/validations";
import { createForm, Field, zodForm } from "@modular-forms/solid";
import TextInput from "./inputs/TextInput";

export const RecipeEditor = () => {
  const [recipeForm, { Form }] = createForm<recipeShapeType>({
    validate: zodForm(recipeShape),
  });

  return (
    <Form>
      <Field name="prepTime" of={recipeForm}>
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
    </Form>
  );
};
