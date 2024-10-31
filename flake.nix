{
  inputs = {
    bun-image-delivery = {
      url = "github:moxie0420/Bun-image-delivery";
      inputs.nixpkgs.follows = "nixpkgs";
    };

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
          dependencies = pkgs.mkYarnPackage {
            name = "node-modules";
            src = ./.;
          };

          astro-chef = pkgs.stdenv.mkDerivation {
            name = "astro-chef";
            src = ./.;
            buildInputs = [pkgs.yarn dependencies];
            buildPhase = ''
              export ASTRO_TELEMETRY_DISABLED=1
              ln -s ${dependencies}/libexec/astro-chef/node_modules node_modules
              ${pkgs.yarn}/bin/yarn build --global-folder ./node_modules/  --cache-folder ./node_modules/
            '';
            installPhase = ''
              mkdir $out
              mv dist $out
              mv database.db $out
            '';
          };

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
            inputs.bun-image-delivery.packages.x86_64-linux.default
          ];
          languages.javascript = {
            enable = true;
            yarn.enable = true;
          };
          scripts = {
            setup.exec = ''
              yarn install
            '';
            clean.exec = ''
              rm -rf node_modules 2> /dev/null
              rm -rf dist 2> /dev/null
              setup
            '';
            dev.exec = ''
              yarn dev
            '';
            build.exec = ''
              clean
              yarn build
            '';
            deploy.exec = ''
              clean
              yarn deploy
            '';
            preview.exec = ''
              build
              yarn preview
            '';
          };
        };
      };
    };
}
