FROM nixos/nix

RUN mkdir -p /srv/astro-chef

WORKDIR /srv/astro-chef

COPY . /srv/astro-chef

RUN nix build .#dependencies --experimental-features 'nix-command flakes'
RUN nix build . --experimental-features 'nix-command flakes'

# Set enviornment variables here
ENV PORT=4321

# See Standalone documentation for https setup
# https://docs.astro.build/en/guides/integrations-guide/node/#standalone

EXPOSE 4321

CMD ["./result/dist/server/entry.mjs"]