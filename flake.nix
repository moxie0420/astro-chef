{
  inputs = {
    flake-parts.url = "github:hercules-ci/flake-parts";

    nixpkgs.url = "github:cachix/devenv-nixpkgs/rolling";
    devenv.url = "github:cachix/devenv";
  };

  nixConfig = {
    substituters = [
      "https://astro-chef.cachix.org"
    ];
    trusted-public-keys = [
      "astro-chef.cachix.org-1:O7sHVqTZKm3PzY5SmpuwWurIAMdetk7oOtAClULR19A="
    ];
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
          default = container;
        };

        devenv.shells.default = {
          cachix = {
            enable = true;
            push.pull = ["pre-commit-hooks" "astro-chef"];
          };

          scripts.build.exec = ''
            nix build .#container
            docker load < result
          '';
          packages = with pkgs; [
            alejandra
            nil
          ];
          languages.javascript = {
            enable = true;
            package = pkgs.nodejs_22;
            pnpm = {
              enable = true;
              package = pkgs.pnpm;
            };
          };
        };
      };
    };
}
