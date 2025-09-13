# Navbar for all pages
class Components::Navbar < Components::Base
  def view_template
    stylesheet_link_tag 'navbar'

    nav(class: 'navbar') do
      a(href: '/', class: 'logo') { 'Astrochef' }
      a { 'Recipes' }
    end
  end
end
