import {
  createForm,
  submit,
  zodForm,
  type SubmitHandler,
} from "@modular-forms/solid";
import TextInput from "@components/inputs/TextInput";
import { RecipeShape, RecipeType } from "@lib/recipes";
import { createRecipe } from "../../database/recipes";
import { Show } from "solid-js";

const CreateForm = () => {
  const [recipeForm, { Form, Field }] = createForm<RecipeType>({
    validate: zodForm(RecipeShape),
  });

  const handleSubmit: SubmitHandler<RecipeType> = async (values) => {
    createRecipe(values);
  };

  return (
    <Form
      class="modal-box mx-auto flex flex-col gap-2.5"
      onSubmit={handleSubmit}
    >
      <div class="divider text-xl font-bold">Create a new Recipe</div>

      <Field name="title">
        {(field, props) => (
          <TextInput
            {...props}
            type="text"
            label="Title"
            value={field.value}
            error={field.error}
            placeholder="What's this recipe called?"
            required
          />
        )}
      </Field>

      <Field name="author">
        {(field, props) => (
          <TextInput
            {...props}
            type="text"
            label="Author"
            value={field.value}
            error={field.error}
            placeholder="Who wrote this?"
            required
          />
        )}
      </Field>

      <div class="divider m-0" />

      <div class="grid w-full grid-cols-2 gap-2.5">
        <Field name="about.prepTime">
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
        <Field name="about.cookTime">
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
        <div class="col-span-2">
          <Field name="about.description">
            {(field, props) => (
              <TextInput
                {...props}
                type="text"
                label="Description"
                value={field.value}
                error={field.error}
                placeholder="What's is this recipe all about?"
              />
            )}
          </Field>
        </div>
      </div>

      <Show
        when={!recipeForm.submitting}
        fallback={
          <div class="btn-btn-primary btn-active">
            <span class="loading loading-spinner loading-lg" />
          </div>
        }
      >
        <button
          class="btn btn-primary"
          onClick={() => {
            console.log("submitting");
            submit(recipeForm);
          }}
        >
          submit
        </button>
      </Show>
    </Form>
  );
};
export default CreateForm;
