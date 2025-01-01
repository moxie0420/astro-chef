{
  stdenv,
  nodejs-slim_latest,
  pnpm,
}:
stdenv.mkDerivation (finalAttrs: {
  pname = "astro-chef";
  version = "development-latest-rc";
  src = ./.;

  nativeBuildInputs = [
    nodejs-slim_latest
    pnpm.configHook
  ];

  pnpmDeps = pnpm.fetchDeps {
    inherit (finalAttrs) pname version src;
    hash = "";
  };

  ASTRO_TELEMETRY_DISABLED = 1;

  buildPhase = ''
    runHook preBuild
    pnpm build
    runHook postBuild
  '';

  installPhase = ''
    mkdir -p $out

    cp ./drizzle.config.ts $out
    cp -r ./Images $out
    cp -r ./db $out
    cp -r ./node_modules $out
    cp -r ./dist $out
    cp -r ./drizzle $out
  '';
})
