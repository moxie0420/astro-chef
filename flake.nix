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
    packages = forEachSystem (system: {
      devenv-up = self.devShells.${system}.default.config.procfileScript;

      #astro chef build deriviation
      default = ./build.nix;
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
                ASTRO_DATABASE_FILE = "/srv/astro-chef.db";
              };

              packages = with pkgs; [alejandra];

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
