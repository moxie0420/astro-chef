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
    hash = "sha256-sVvl0OW7vjnH0Hc0MiASX9XS6EF+936bigkEvb9ado4=";
  };

  ASTRO_TELEMETRY_DISABLED = 1;

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
