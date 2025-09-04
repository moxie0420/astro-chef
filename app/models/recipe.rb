class Recipe < ApplicationRecord
  include Filterable
  include SearchCop

  has_one_attached :featured_image
  has_rich_text :body
  validates :name, presence: true

  search_scope :search do
    attributes :name, :description, :created_at, :updated_at
  end

  has_many :ingredients, dependent: :destroy
end
