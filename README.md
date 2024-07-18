# Astro chef
Astro chef is a ready to ho solution to store and use your recipe collection 

## Contains

- Ready to go Devcontainer
- Astro
- Tailwind CSS
- CSS Inlining via [Playform/Inline](https://github.com/PlayForm/Inline)
- CSS Reduction Via [PurgeCSS](https://github.com/codiume/orbit)
- Size Reduction via [Playform/Compress](https://github.com/PlayForm/Compress)
- Brotli and Gzip Compression via [astro-compressor](https://github.com/sondr3/astro-compressor)

## Todo

- [x] Devcontainer
- [x] Astro + Plugins
- Components
  - [ ] Recipe Card
  - [x] Header
  - [ ] Ingredients Box
  - [x] Search Box
- [ ] Animations
- Color Themes
  - [x] Light theme
  - [ ] Dark theme

## Commands

All commands are run from the root of the project, from a terminal:

| Command             | Action                                           |
| :------------------ | :----------------------------------------------- |
| `setup`             | Installs dependencies                            |
| `dev`               | Starts local dev server at `localhost:4321`      |
| `build`             | Build your production site to `./dist/`          |
| `preview`           | Preview your build locally, before deploying     |
| `yarn astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `yarn astro --help` | Get help using the Astro CLI                     |
| `update`            | Updates Flake.lock and all Node Modules          |
