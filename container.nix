{
  dockerTools,
  astro-chef,
  nodejs-slim_latest,
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

  contents = [astro-chef nodejs-slim_latest busybox bash sqld];
  config = {
    Cmd = [
      "/bin/bash"
      "-c"
      ''
        cd /
        cp -r /Images /data
        node /node_modules/astro/astro.js db push --remote
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
