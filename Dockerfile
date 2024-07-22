FROM nixos/nix

RUN mkdir -p /srv/astro-chef

WORKDIR /srv/astro-chef

COPY . /srv/astro-chef

RUN nix build .#dependencies --experimental-features 'nix-command flakes' --accept-flake-config
RUN nix build . --experimental-features 'nix-command flakes' --accept-flake-config

WORKDIR /srv/astro-chef/result

# Set enviornment variables here
ENV PORT=4322

# See Standalone documentation for https setup
# https://docs.astro.build/en/guides/integrations-guide/node/#standalone

EXPOSE 4322

RUN nix profile install nixpkgs#nodejs-slim_22 --experimental-features 'nix-command flakes' --impure

CMD ["node ./dist/server/entry.mjs"]