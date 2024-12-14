{
  stdenv,
  nodejs,
  pnpm,
}:
stdenv.mkDerivation (finalAttrs: {
  pname = "astro-chef";
  version = "development-latest";
  src = ./.;

  nativeBuildInputs = [
    nodejs
    pnpm.configHook
  ];

  pnpmDeps = pnpm.fetchDeps {
    inherit (finalAttrs) pname version src;
    hash = "sha256-6ZS1WDJnMaqniA+IM1NfXmM/keoy4dma2VOWr5hllh4=";
  };

  buildPhase = ''
    runHook preBuild
    pnpm build
    runHook postBuild
  '';

  installPhase = ''
    mkdir -p $out
    cp -r ./dist $out
  '';
})
