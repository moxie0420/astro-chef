require "filewatcher"

Filewatcher
  .new(["app/assets/stylesheets/*.scss"])
  .watch do |changes|
    changes.each do |filename, event|
      puts "#{filename} #{event}"

      baseName = File.basename(filename, ".scss")

      css = `sass #{filename}`

      File.open("tmp/#{baseName}.css", "w") { |f| f.write(css) }

      minified =
        `npx lightningcss --minify --bundle --targets ">= 0.25%" ./tmp/#{baseName}.css`

      File.open("app/assets/builds/#{baseName}.css", "w") do |f|
        f.write(minified)
      end
    end
  end
