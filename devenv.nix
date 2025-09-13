{pkgs, ...}: {
  packages = with pkgs; [
    pkg-config
    libyaml.dev
    openssl.dev
  ];

  name = "astrochef";

  # https://devenv.sh/services/
  services.postgres = {
    enable = true;
    initialScript = ''
      CREATE ROLE postgres WITH LOGIN PASSWORD 'postgres' SUPERUSER;
    '';
    initialDatabases = [{name = "astrochef_development";}];
  };

  languages = {
    javascript = {
      enable = true;
      yarn.enable = true;
    };
    ruby = {
      enable = true;
      package = pkgs.ruby_3_4;
      bundler.enable = true;
    };
  };

  processes = {
    rails-dev.exec = "env RUBY_DEBUG_OPEN=true bin/rails server";
    postcss.exec = "postcss ./app/assets/stylesheets --dir ./app/assets/builds --watch";
  };

  enterShell = ''
    bundle
  '';
}
