class CreateRecipesSearchIndex < ActiveRecord::Migration[8.0]
  def up
    execute "CREATE VIRTUAL TABLE fts_recipes USING fts5(name, description, content, recipe_id)"
  end

  def down
    execute "DROP TABLE IF EXISTS fts_recipes"
  end
end
