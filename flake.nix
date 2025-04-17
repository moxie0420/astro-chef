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
  }:
    flake-parts.lib.mkFlake {inherit inputs;} {
      imports = [
        inputs.devenv.flakeModule
      ];

      systems = ["x86_64-linux" "aarch64-linux"];

      perSystem = {pkgs, ...}: {
        devenv.shells.default = {
          packages = with pkgs; [
            alejandra
            nil
            snyk
          ];

          languages.javascript = {
            enable = true;
            package = pkgs.nodejs;
            bun.enable = true;
          };
        };
      };
    };
}
