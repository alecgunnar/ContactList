module ContactsManager
  class RenderJSXTag < Liquid::Tag

    def initialize(tag_name, text, tokens)
      super
      @text = text
    end

    def render(context)
      cmd = "jsx _jsx/ #{Jekyll.configuration({})['jsx_compile_to']}"
      puts("Compiling JSX: #{cmd}")
      puts(`#{cmd}`)
      "#{Jekyll.configuration({})['jsx_compile_to']}#{@text}"
    end
  end
end

Liquid::Template.register_tag('jsx', ContactsManager::RenderJSXTag)
