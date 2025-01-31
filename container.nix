{
  dockerTools,
  astro-chef,
  nodejs_22,
  created ? "now",
}:
dockerTools.buildLayeredImage {
  name = "Astro-Chef";
  tag = "latest";

  contents = [astro-chef nodejs_22];
  config = {
    Cmd = "${nodejs_22}/bin/node ${astro-chef}/dist/server/entry.mjs";
    Env = [
      "ASTRO_TELEMETRY_DISABLED=1"
    ];
    ExposedPorts = {
      "4321" = {};
    };
  };

  inherit created;
}
