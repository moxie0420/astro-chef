{
  mkYarnPackage
  fetchFromGithub,
}:
mkYarnPackage rec {
  pname = "astro-chef";
  version = "0.0.1";

  src = fetchFromGithub {
    owner = "moxie0420";
    repo = "astro-chef";
    rev = "v${version}";
    sha256 = "";
  };

  packageJSON = ./package.json;
  yarnLock = ./yarn.lock;

  buildPhase = ''
    export HOME=$(mktemp -d)
    yarn --offline build
  '';
}
