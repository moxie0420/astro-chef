import Button from "@components/Button";
import { closeMenu } from "@lib/state/menu";
import { createNewRecipe } from "@lib/state/recipes";
import { recipeShape, type recipeShapeType } from "@lib/validations";
import {
  createForm,
  Field,
  zodForm,
  type SubmitHandler,
} from "@modular-forms/solid";
import Cancel from "src/icons/cancel.svg?component-solid";
import TextInput from "./inputs/TextInput";

const CreateForm = () => {
  const [recipeForm, { Form }] = createForm<recipeShapeType>({
    validate: zodForm(recipeShape),
  });

  const submit: SubmitHandler<recipeShapeType> = async (values, event) => {
    event.preventDefault();
    await createNewRecipe(values);
    closeMenu();
  };

  return (
    <Form class="flex flex-col gap-1" onSubmit={submit}>
      <Field name="title" of={recipeForm}>
        {(field, props) => (
          <TextInput
            {...props}
            type="text"
            label="Title"
            value={field.value}
            error={field.error}
            placeholder="Geaneu's Hot German Potato Salad ..."
            required
          />
        )}
      </Field>

      <Field name="author" of={recipeForm}>
        {(field, props) => (
          <TextInput
            {...props}
            type="text"
            label="Author"
            value={field.value}
            error={field.error}
            placeholder="Who created this gem??"
            required
          />
        )}
      </Field>

      <Field name="description" of={recipeForm}>
        {(field, props) => (
          <TextInput
            {...props}
            type="text"
            label="Description"
            value={field.value}
            error={field.error}
            placeholder="Why should you make this?"
            required
          />
        )}
      </Field>

      <div class="flex flex-row gap-1">
        <Field name="prepTime" of={recipeForm}>
          {(field, props) => (
            <TextInput
              {...props}
              type="text"
              label="Prep Time"
              value={field.value}
              error={field.error}
              placeholder="How much prep time?"
            />
          )}
        </Field>
        <Field name="cookTime" of={recipeForm}>
          {(field, props) => (
            <TextInput
              {...props}
              type="text"
              label="Cook Time"
              value={field.value}
              error={field.error}
              placeholder="How long does this take?"
            />
          )}
        </Field>
      </div>

      <div class="mt-2 flex w-full justify-between">
        <Button type="submit" size="small">
          Submit
        </Button>
        <Button type="reset" size="small">
          <Cancel />
        </Button>
      </div>
    </Form>
  );
};
export default CreateForm;
