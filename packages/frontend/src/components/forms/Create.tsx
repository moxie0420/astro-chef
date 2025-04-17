import { createForm, zodForm, type SubmitHandler } from '@modular-forms/solid';
import TextInput from '@components/inputs/TextInput';
import Recipes, { RecipeShape, RecipeType } from '@lib/recipes';

const CreateForm = () => {
  const [, { Form, Field }] = createForm<RecipeType>({
    validate: zodForm(RecipeShape),
  });

  const submit: SubmitHandler<RecipeType> = async (values) =>
    Recipes.insert(values);

  return (
    <div class="bg-overlay rounded-md p-2 min-w-lg">
      <Form class="flex flex-col gap-1" onSubmit={submit}>
        <Field name="title">
          {(field, props) => (
            <TextInput
              {...props}
              type="text"
              label="Title"
              value={field.value}
              error={field.error}
              placeholder="Grandma's Hot German Potato Salad ..."
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
              placeholder="Who created this gem??"
              required
            />
          )}
        </Field>

        <Field name="about.description">
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

        <div class="flex flex-row gap-1 w-full pb-2">
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
        </div>

        <button type="submit" class="btn btn-primary">
          submit
        </button>
      </Form>
    </div>
  );
};
export default CreateForm;
