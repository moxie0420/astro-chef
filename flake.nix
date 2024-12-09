{
  inputs = {
    devenv = {
      url = "github:cachix/devenv";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    flake-parts.url = "github:hercules-ci/flake-parts";

    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
  };

  outputs = inputs @ {flake-parts, ...}:
    flake-parts.lib.mkFlake {inherit inputs;} {
      imports = [
        inputs.devenv.flakeModule
      ];

      systems = ["x86_64-linux"];

      perSystem = {pkgs, ...}: {
        packages = rec {
          astro-chef = pkgs.callPackage ./package.nix {};

          default = astro-chef;
        };

        devenv.shells.default = {
          env = {
            IMAGE_PATH = "./Assets";
            CACHE_PATH = "./Assets/cache";
          };
          processes = {
            images.exec = ''
              bun-image-delivery
            '';
          };
          packages = with pkgs; [
            alejandra
            yarn2nix
            unzip
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
