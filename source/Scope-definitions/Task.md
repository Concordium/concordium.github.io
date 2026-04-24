# Docs Site Restructuring Plan

We are going to make a restructuring of the doc site (the files in mainnet).

Everything we do in the restructure must be documented.

The framework for the new structure is the Divio system (Diataxis) that defines four types of technical documentation types: Explanations, How-tos, Tutorials and References. This will be reflected in the navigation of the site that will have the menus Learn (explanations), Tutorials, How to and Technical Reference.

The restructure will include identifying which type each of the existing documents belong to — and we will move them accordingly. There will be documents that include content from more than one type or for some other reason may be difficult to categorize — here we will try to make the best choice, with notes in a separate document about why they have been placed as they have and what we would recommend for future improvements in order to make them fit better.

There may also be documents that we recommend removing from the dev doc site as they do not really belong in such a site.

## Background documents

I have uploaded the following documents that are the result of the background work:

**Divio framework.md**: This document describes the four types of documents and explains what their purposes are.

**Navigation structure.md**: This document shows the structure of the four menus we want to have. It also shows the proposed sections for each menu. Note that there may be sections that have no content yet — in the sense that we do not have such documents at the moment. We will not be able to create these documents now, so in these cases we will need to document this — and probably not insert the sections just yet (we don't want empty sections — and besides we follow a structure on the site where a section = a top-document that can have sub-documents under it, a section is not just an empty heading).

**Document structure mapping.md**: This is a first attempt to map the existing documents with their current location and their proposed location. For some menus, e.g. Learn, this mapping is almost complete, for others some work remains.
These documents can be found in the folder Scope-definitions

## Process

We will start with the Learn menu as this is the most complete in terms of mapping. Claude will work through the documents one by one, moving them from their current location in the Docs menu to the new Learn structure as defined in the navigation structure and document mapping. Each change will be approved before moving on to the next. Once Learn is complete and approved, we will assess the order of the remaining menus based on what is most complete in the mapping.

When documents are moved, all internal links must be updated to reflect their new location. This also applies to glossary references, which are used throughout the documentation to display hover text explanations — these must continue to work correctly after the restructure.

## Style guide

There is also a style guide currently located on the doc site. This does not belong on a developer documentation site and should be moved — likely to Confluence. Claude can reference it when working with the documents.

