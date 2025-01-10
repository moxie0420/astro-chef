{
  inputs = {
    devenv = {
      url = "github:cachix/devenv";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    flake-parts.url = "github:hercules-ci/flake-parts";

    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
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
          astro-chef = pkgs.callPackage ./package.nix {};
          container = pkgs.callPackage ./container.nix {inherit astro-chef created;};
          default = astro-chef;
        };

        devenv.shells.default = {
          scripts = {
            buildDist.exec = ''
              nix build .#container
              docker load < result
            '';
          };
          processes = {
          };
          packages = with pkgs; [
            alejandra
            compose2nix
          ];
          languages.javascript = {
            enable = true;
            package = pkgs.nodejs-slim_latest;
            pnpm = {
              enable = true;
              package = pkgs.pnpm;
            };
          };
        };
      };
    };
}
