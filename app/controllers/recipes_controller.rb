# handles CRUD for the recipe model as well as filtering and searching
class RecipesController < ApplicationController
  # index page with hot, new, and random recipes
  def index
    render Views::Recipes::Index.new
  end
end
