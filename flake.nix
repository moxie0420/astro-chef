{
  inputs = {
    nixpkgs.url = "github:cachix/devenv-nixpkgs/rolling";
    systems.url = "github:nix-systems/default";
    devenv.url = "github:cachix/devenv";
    devenv.inputs.nixpkgs.follows = "nixpkgs";
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
          export ASTRO_DATABASE_FILE=/srv/astro-chef/database.db
          ln -s ${node-modules}/libexec/astro-chef/node_modules node_modules
          ${pkgs.yarn}/bin/yarn build --global-folder ./node_modules/  --cache-folder ./node_modules/
        '';
        installPhase = ''
          mkdir $out
          mv dist $out
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
              dotenv.enable = true;

              env = {
                ASTRO_DATABASE_FILE = "/srv/astro-chef/database.db";
              };

              packages = with pkgs; [
                alejandra
                yarn2nix
              ];

              languages.javascript = {
                enable = true;
                yarn.enable = true;
              };

              scripts = {
                setup.exec = ''
                  yarn
                '';
                clean.exec = ''
                  rm -rf node_modules 2> /dev/null
                  rm -rf dist 2> /dev/null
                  setup
                '';
                dev.exec = ''
                  yarn run dev
                '';
                build.exec = ''
                  clean
                  yarn run build
                '';
                deploy.exec = ''
                  clean
                  yarn run deploy
                '';
                preview.exec = ''
                  build
                  yarn run preview
                '';
                update.exec = ''
                  nix flake update
                  yarn upgrade
                '';
              };
            }
          ];
        };
      });
  };
}
