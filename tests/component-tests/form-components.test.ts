/**
 * @vitest-environment jsdom
 */

import TextArea from "@components/forms/inputs/TextArea";
import { render } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { test } from "vitest";

const user = userEvent.setup();

test("Styled text area", async () => {
  const res = await render(() => typeof TextArea);
});
