{
  dockerTools,
  astro-chef,
  nodejs_latest,
  busybox,
  bash,
  sqld,
  created ? "now",
  port ? "4321",
  hostIP ? "0.0.0.0",
}:
dockerTools.buildLayeredImage {
  name = "Astro-Chef";
  tag = "latest";

  contents = [astro-chef nodejs_latest busybox bash sqld];
  config = {
    Cmd = [
      "/bin/bash"
      "-c"
      ''
        cd /
        npx drizzle-kit migrate
        node /dist/server/entry.mjs
      ''
    ];
    WorkingDir = "/data";
    Env = [
      "HOST=${hostIP}"
      "PORT=${port}"
      "ASTRO_TELEMETRY_DISABLED=1"
    ];
    ExposedPorts = {
      port = {};
      dbPort = {};
    };
    Volumes = {
      "/data" = {};
    };
  };

  inherit created;
}
