class CreateRecipes < ActiveRecord::Migration[8.0]
  def change
    create_table :recipes do |t|
      t.string :name
      t.string :author
      t.string :description
      t.string :body

      t.timestamps
    end
  end
end
