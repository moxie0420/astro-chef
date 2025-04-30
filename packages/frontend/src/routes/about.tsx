import { createFileRoute } from "@tanstack/solid-router";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <p></p>
    </div>
  );
}
