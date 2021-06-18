# This is a small extension for sphinx, which overrides the default `toctree`
# function used to generate the HTML for the table of content. The override
# makes `toctree` display the table-of-content one level down for the
# corresponding entry in top level toctree.
from sphinx import addnodes

def flatmap(f, xs):
    return [y for ys in xs for y in f(ys)]

# The number of top level directories until the right level for the toctree
number_of_top_directories = 1

def html_page_context(app, pagename, templatename, context, doctree):
    env = app.builder.env
    # Split pagename path into parts
    page_path_parts = pagename.split('/')
    # Ignore the files at the top level
    if len(page_path_parts) < number_of_top_directories:
        return

    # Top directory of the current page
    page_top_entry_name = page_path_parts[number_of_top_directories - 1]
    # Get the document tree from the master document
    doctree = env.get_doctree(env.config.master_doc)
    # Get toctrees defined in master doc
    master_toctrees = doctree.traverse(addnodes.toctree)
    # Get direct children (entries) of the master doc
    master_entries = list(flatmap(lambda toctree: toctree['entries'], master_toctrees))
    # Get the directories entries of entries
    master_entry_dirs = list(map(lambda e: e[1].split('/')[number_of_top_directories - 1], master_entries))
    # Ensure the current page is in one of the entries
    if page_top_entry_name not in master_entry_dirs:
        return
    # Get current entry
    entry_index = master_entry_dirs.index(page_top_entry_name)
    current_entry = master_entries[entry_index]
    # Get the document tree for this entry
    subdoctree = env.get_doctree(current_entry[1])

    # toctree for this page with the toctree of the current entry
    def toctree(maxdepth, collapse, includehidden, titles_only):
        result = None
        for toctreenode in subdoctree.traverse(addnodes.toctree):
            toc = env.resolve_toctree(
                pagename,
                app.builder,
                toctreenode,
                maxdepth = maxdepth,
                collapse = collapse,
                includehidden = includehidden,
                titles_only = titles_only)
            if result == None:
                result = toc
            else:
                result.extend(toc)
        env.resolve_references(result, pagename, app.builder)
        return app.builder.render_partial(result)['fragment']

    # Override toctree for this page with the toctree of the current entry
    context['toctree'] = toctree
    # Adds the current top entry to the context
    context['entry'] = current_entry[1]

# Run when extension is enabled
def setup(app):
    # Adds a hook right before the HTML template engine runs, allows to modify
    # the context.
    # https://www.sphinx-doc.org/en/master/extdev/appapi.html#event-html-page-context
    app.connect('html-page-context', html_page_context)
