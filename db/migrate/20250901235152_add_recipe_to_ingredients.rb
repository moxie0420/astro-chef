class AddRecipeToIngredients < ActiveRecord::Migration[8.0]
  def change
    add_reference :ingredients, :recipe, null: false, foreign_key: true
  end
end
