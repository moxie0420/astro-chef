class Card < Phlex::HTML
  def initialize()
  end

  def view_template
    h1 { "Hello, world" }
  end
end
