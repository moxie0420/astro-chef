# Gloabal view layout
class Views::Base < Components::Base
  include Phlex::Rails::Helpers::StyleSheetLinkTag
  def meta_tags
    meta(name: 'viewport', content: 'width=device-width,initial-scale=1')
    meta(name: 'apple-mobile-web-app-capable', content: 'yes')
    meta(name: 'mobile-web-app-capable', content: 'yes')
  end

  def link_tags
    link(rel: 'icon', href: '/icon.png', type: 'image/png')
    link(rel: 'icon', href: '/icon.svg', type: 'image/svg+xml')
    link(rel: 'apple-touch-icon', href: '/icon.png')

    stylesheet_link_tag 'application', "data-turbo-track": 'reload'
  end

  def head_content; end

  def head_template
    head do
      title { page_title }
      meta_tags
      link_tags
      head_content
    end
  end

  def around_template
    doctype
    html do
      head_template
      body do
        render Components::Navbar
        super
      end
    end
  end
end
