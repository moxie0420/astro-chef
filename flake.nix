{
  inputs = {
    flake-parts.url = "github:hercules-ci/flake-parts";

    nixpkgs.url = "github:cachix/devenv-nixpkgs/rolling";
    devenv.url = "github:cachix/devenv";
  };

  outputs = inputs @ {
    flake-parts,
    self,
    ...
  }: let
    created = builtins.substring 0 8 self.lastModifiedDate;
  in
    flake-parts.lib.mkFlake {inherit inputs;} {
      imports = [
        inputs.devenv.flakeModule
      ];

      systems = ["x86_64-linux" "aarch64-linux"];

      perSystem = {pkgs, ...}: {
        packages = rec {
          astro-chef = pkgs.callPackage ./nix/package.nix {};
          container = pkgs.callPackage ./nix/container.nix {inherit astro-chef created;};
          default = container;
        };

        devenv.shells.default = {
          cachix = {
            enable = true;
            push = "astro-chef";
            pull = ["astro-chef"];
          };

          scripts.build.exec = ''
            nix build .#container
            docker load < result
          '';

          packages = with pkgs; [
            alejandra
            nil
            snyk
          ];

          languages.javascript = {
            enable = true;
            package = pkgs.nodejs-slim_22;
            pnpm.enable = true;
          };

          git-hooks.hooks = {
            alejandra.enable = true;
            eslint.enable = true;
          };
        };
      };
    };
}
