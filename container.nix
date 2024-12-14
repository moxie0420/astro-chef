{
  dockerTools,
  buildEnv,
  self,
  ...
}:
dockerTools.buildImage {
  name = "Astro-Chef";
  tag = "latest";

  copyToRoot = buildEnv {
    name = "astro-chef-root";
    paths = [self.packages.x86_64-linux.astro-chef];
  };
}
