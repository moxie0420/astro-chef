FROM nixos/nix

RUN nix build . --experimental-features 'nix-command flakes'