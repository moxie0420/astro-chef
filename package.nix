{
  stdenv,
  nodejs-slim_latest,
  pnpm,
}:
stdenv.mkDerivation (finalAttrs: {
  pname = "astro-chef";
  version = "development-latest";
  src = ./.;

  nativeBuildInputs = [
    nodejs-slim_latest
    pnpm.configHook
  ];

  pnpmDeps = pnpm.fetchDeps {
    inherit (finalAttrs) pname version src;
    hash = "sha256-6ZS1WDJnMaqniA+IM1NfXmM/keoy4dma2VOWr5hllh4=";
  };

  ASTRO_TELEMETRY_DISABLED = 1;
  ASTRO_DB_REMOTE_URL = "http://127.0.0.1:8080";

  buildPhase = ''
    runHook preBuild
    pnpm build
    runHook postBuild
  '';

  installPhase = ''
    mkdir -p $out

    cp -r ./Images $out
    cp -r ./db $out
    cp -r ./migrations $out
    cp -r ./node_modules $out
    cp -r ./dist $out
  '';
})
