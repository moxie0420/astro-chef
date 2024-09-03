{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    systems.url = "github:nix-systems/default";
    devenv.url = "github:cachix/devenv";
    devenv.inputs.nixpkgs.follows = "nixpkgs";
    bun-image-delivery = {
      url = "github:moxie0420/Bun-image-delivery";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  nixConfig = {
    extra-trusted-public-keys = "devenv.cachix.org-1:w1cLUi8dv3hnoSPGAuibQv+f9TZLr6cv/Hm9XgU50cw=";
    extra-substituters = "https://devenv.cachix.org";
  };

  outputs = {
    self,
    nixpkgs,
    devenv,
    systems,
    bun-image-delivery,
    ...
  } @ inputs: let
    forEachSystem = nixpkgs.lib.genAttrs (import systems);
  in {
    packages = forEachSystem (system: let
      pkgs = nixpkgs.legacyPackages.${system};
      node-modules = pkgs.mkYarnPackage {
        name = "node-modules";
        src = ./.;
      };
      astro-chef = pkgs.stdenv.mkDerivation {
        name = "astro-chef";
        src = ./.;
        buildInputs = [pkgs.yarn node-modules];
        buildPhase = ''
          export ASTRO_TELEMETRY_DISABLED=1
          ln -s ${node-modules}/libexec/astro-chef/node_modules node_modules
          ${pkgs.yarn}/bin/yarn build --global-folder ./node_modules/  --cache-folder ./node_modules/
        '';
        installPhase = ''
          mkdir $out
          mv dist $out
          mv database.db $out
        '';
      };
    in {
      devenv-up = self.devShells.${system}.default.config.procfileScript;
      dependencies = node-modules;
      #astro chef build deriviation
      default = astro-chef;
    });

    devShells =
      forEachSystem
      (system: let
        pkgs = nixpkgs.legacyPackages.${system};
      in {
        default = devenv.lib.mkShell {
          inherit inputs pkgs;
          modules = [
            {
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
                npm.enable = true;
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
            }
          ];
        };
      });
  };
}
