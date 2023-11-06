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

### Nov 02 2023 12:30am
- previous commits not about new features
- main info:
    - use Emoji Mart inside a child svelte component and show as the content using skeleton's popup
    - Since Emoji Mart Picker class is js/react-webcomponent lib, need to use actions thus when trying to appendChild(picker) type does not match so made it `as Element` to make ts happy.
    - Add event dispatcher to send event + data to parent to add/increment emoji
- Problems:
    - move emoji data to global. maybe that fix slow?
        - Should move the emoji data to global like store or localstorage and be a 'singleton'
    - Adding new emoji to reaction list shifts popup which is slow/render lags.
    - Consider maybe not having a child component for the emoji mart and popup and instead put it in the MessageMDItem.svelte component to not use event dispatcher?
    - On click on existing emoji in the each block add title attr and event to increase count as well.
    - overflow of list of emoji. add button should sticky to right if overflow.
    - emoji list title on hover
    - overflow emoji 

### Nov 02 2023 10pm
- (inherit issues from previous commit)
- popup emoji picker should close on emoji selected but skeleton.dev ui library v2 limitation with popups is not flexible to add programmatically close
    - potential temporary workaround `use:popup={someBool ? popupHover : {}}` without checking for disabled state but using ts, this is not good since skeleton.dev will error out...
- add smui for menu component but need to change packagejson and add .npmrc as shown: `github.com/hperrin/svelte-material-ui/issues/348`
    - menu component per message present. does not do anything and no 'copy message link'.
- problems:
    - Emoji adding restriction needed: if use reacted already, cannot react same emoji!
        - for now, basic code is present just commented out.
    - backend/proper crud
***

### Nov 06 2023 4pm
- See svelte-markdown-text repo where I use textarea and svelte-markdown to render custom renderer.
    - see the readme for that repo. 
    - summary, I could drop quill and use a textarea/other md editor with svelte-markdown in exchange for quill-mention.
        - so would need to add custom autocomplete or use another library for mentioning
    - difference with quill i am sending html string to svelte-markdown while svelte-markdown-text repo sending markdown string.
- problems:
    - virtualscroll.scrolltobottom does not work any more. the overflow not there.
        - for now have to use `svelte.dev/repl/937a3a035a1f41178714cd7e2e21ca7a?version=3.48.0` approach
    - virtual scroll doesn't render more than 29 items for the /otter page. why?
### todo:

Message:

- url/link of each message item w/ goto() by 
```ts
    for(var i = 0; i < items.length; i++) {
    if(items[i].id === find) {
        index = i;
        break;
    }
	}
```
- on send message reset url if use message id as url but need to handle no reload/refresh of page:
    - ```
		https://stackoverflow.com/questions/74462823/is-there-any-way-to-use-goto-without-reloading-page-on-sveltekit
		https://www.reddit.com/r/sveltejs/comments/12esuxe/how_do_i_change_the_url_of_the_page_in_sveltekit/
		https://www.reddit.com/r/sveltejs/comments/12esuxe/how_do_i_change_the_url_of_the_page_in_sveltekit/
		https://github.com/sveltejs/kit/discussions/8540
		or
		layout.svelte
		https://www.reddit.com/r/sveltejs/comments/12esuxe/how_do_i_change_the_url_of_the_page_in_sveltekit/
	```

Editor:

- for now used quill so next try to add editing
- send message using enter instead of button (codepen.io/username8978/pen/jwgebb)

Gridster like feature:

- dnd grid lib or Golden Layout

Code Editor (purple tab group)

- code editor w/ custom language
- or just code highlighter while typing like codejar

Graph:

- node/graph lib e.g. cytoscape, sigma, ploty for org chart


***
### things to consider:
- quill: v1.3.7 uses outdated dom mutation. potential fix in v2.0.0 if that ever get released...
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
    - use easy-markdown-editor and since using textarea, can maybe use tributejs or other autocomplete component, it just that, hashtag/mention won't standout just like github textarea when entering mention/hashtag
	- other full wysiwyg:
		- basecamp trix w/ @mention/#hashtags
		- summernotes (if ok w/ jquery) 
		- jodit
		- if use vue maybe tiptap
		- svelte-slatejs if mention is possible in it.
		- tui editor
		- milkdown
		- SCEditor