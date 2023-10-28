# sveltekit project or prototype repo that uses various libraries

### Sep 22 2023 - Oct 27 2023:
- try to use:
    - monaco
    - svelte-virtual-scroll-list
    - svelte splitter
    - svelte markdown / svelte exmarkdown
    - quill
    - tiptap
    - skeleton.dev or carbon 
- main info:
    - commit of quill + virtual list + svelte-markdown(marked)
    - use domsanitize to sanitize html and pass html directly to svelte-markdown
    - quill auto grow to max height until scrollbar like discord input
    - remove the h-full the skeletondev automatically added with h-screen
    - add other 100vh for the `otter` route to have proper scrollbar

  
***
### todo:
Editor:

- for now used quill so next try to add editing
- send message using enter instead of button

Gridster like feature:

- dnd grid lib or Golden Layout

Code Editor (purple tab group)

- code editor w/ custom language
- or just code highlighter while typing like codejar

Graph:

- node/graph lib e.g. cytoscape, sigma, ploty for org chart


***
### things to consider:
- quill: v1.3.7 uses outdated dom mutation insteat. potential fix in v2.0.0 if that ever get released...
- different approach to quill and svelte-markdown
    - svelte-exmarkdown with mdast and hast
    ```txt
    quill :
    (-> delta -> sanitize if possible -> save delta)
    (-> innerhtml -> hast from html -> hast sanitize -> save hast / mdast (mdast no style))
    render:
    (get hast or delta -> hast to html or hast to mdast -> sanitize -> mdast to markdown -> sanitize -> markdown to svelte-markdown)
    ```
    - markedjs tokenzier for @mention/#hashtags with or without regular textarea
	- regular textarea with tributejs which later converts to markdown on save/preview like github
	- other full wysiwyg:
		- basecamp trix w/ @mention/#hashtags
		- summernotes (if ok w/ jquery) 
		- jodit
		- if use vue maybe tiptap
		- svelte-slatejs if mention is possible in it.
		- tui editor
		- milkdown
		- SCEditor