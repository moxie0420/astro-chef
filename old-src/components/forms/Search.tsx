import { searchOptions } from "@lib/validations";
import { createForm, zodForm, type SubmitHandler } from "@modular-forms/solid";
import { type Component } from "solid-js";
import { Select } from "./inputs/Select";
import TextInput from "./inputs/TextInput";

const SearchOptions: Component<{
  sort: "random" | "popular" | "title" | "by-id";
  search?: string;
}> = (props) => {
  const [searchForm, { Form, Field }] = createForm<searchOptions>({
    initialValues: {
      search: props.search,
      sorting: props.sort,
    },
    validate: zodForm(searchOptions),
  });

  const submit: SubmitHandler<searchOptions> = (values, event) => {
    event.preventDefault();
  };

  return (
    <Form
      class="bg-overlay m-1 mx-auto flex max-w-md flex-col gap-1 rounded-md p-1"
      onSubmit={submit}
    >
      <Field name="search">
        {(field, props) => (
          <TextInput
            {...props}
            type="text"
            label="Search"
            value={field.value}
            error={field.error}
          />
        )}
      </Field>

      <Field name="sorting">
        {(field, props) => (
          <Select
            {...props}
            label="Sort By"
            value={field.value || "title"}
            error={field.error}
            each={[
              ["Random", "random"],
              ["Popular", "popular"],
              ["Title", "title"],
              ["UUID", "id"],
            ]}
          />
        )}
      </Field>
    </Form>
  );
};

export default SearchOptions;
