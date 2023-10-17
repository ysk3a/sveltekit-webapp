<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import * as monaco from 'monaco-editor';
	import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
	import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
	import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
	import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
	import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';


    const htmlCode  = `<!-- Simple demo of Monaco Editor using SvelteKit
// Nice isn't it? I hope you like it and find it useful.
// See you at https://github.com/sonyarianto/sveltekit-monaco-editor -->

<html>
    <head>
        <title>Monaco Editor Demo</title>
        <style>
            html, body {
                height: 100%;
                margin: 0;
                padding: 0;
                overflow: hidden;
            }
        </style>
        
    </head>
    <body>
        <div id="container" style="width:100%;height:100%;"></div>
    </body>
</html>`;
    const jsCode  = `// Simple demo of Monaco Editor using SvelteKit
// Nice isn't it? I hope you like it and find it useful.
// See you at https://github.com/sonyarianto/sveltekit-monaco-editor

function getFullName(first, last) {
    return first + " " + last;
}

getFullName("Sony", "AK"); // Sony AK

// Demo of Closure as Factory Function

function makeAdder(x) {
    return function (y) {
        return x + y;
    };
}

const add5 = makeAdder(5); // 5 is x
const add10 = makeAdder(10); // 10 is x

console.log(add5(2)); // 7
console.log(add10(2)); // 12`;
    const phpCode = `// Simple demo of Monaco Editor using SvelteKit
// Nice isn't it? I hope you like it and find it useful.
// See you at https://github.com/sonyarianto/sveltekit-monaco-editor

<?php
function getFullName($first, $last) {
    return $first . " " . $last;
}`;
    const pyCode = `# Simple demo of Monaco Editor using SvelteKit
# Nice isn't it? I hope you like it and find it useful.
# See you at https://github.com/sonyarianto/sveltekit-monaco-editor

def getFullName(first, last):
    return first + " " + last
    
getFullName("Sony", "AK") # Sony AK`;
    const tsCode = `// Simple demo of Monaco Editor using SvelteKit
// Nice isn't it? I hope you like it and find it useful.
// See you at https://github.com/sonyarianto/sveltekit-monaco-editor

function getFullName(first: string, last: string): string {
    return first + " " + last;
}

getFullName("Sony", "AK"); // Sony AK`;

	let editorElement: HTMLDivElement;
	let editor: monaco.editor.IStandaloneCodeEditor;
	let model: monaco.editor.ITextModel;

	function loadCode(code: string, language: string) {
		model = monaco.editor.createModel(code, language);

		editor.setModel(model);
	}

	onMount(async () => {
		self.MonacoEnvironment = {
			getWorker: function (_: any, label: string) {
				if (label === 'json') {
					return new jsonWorker();
				}
				if (label === 'css' || label === 'scss' || label === 'less') {
					return new cssWorker();
				}
				if (label === 'html' || label === 'handlebars' || label === 'razor') {
					return new htmlWorker();
				}
				if (label === 'typescript' || label === 'javascript') {
					return new tsWorker();
				}
				return new editorWorker();
			}
		};

		monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);

		editor = monaco.editor.create(editorElement, {
			automaticLayout: true,
			theme: 'vs-dark'
		});

		loadCode(jsCode, 'javascript');
	});

	onDestroy(() => {
		monaco?.editor.getModels().forEach((model) => model.dispose());
		editor?.dispose();
	});
</script>

<div class="flex h-screen w-full flex-col">
	<div class="flex gap-x-1 p-1">
		<button class="w-fit border-2 p-1" on:click={() => loadCode(jsCode, 'javascript')}
			>JavaScript</button
		>
		<button class="w-fit border-2 p-1" on:click={() => loadCode(tsCode, 'typescript')}
			>TypeScript</button
		>
		<button class="w-fit border-2 p-1" on:click={() => loadCode(phpCode, 'php')}>PHP</button>
		<button class="w-fit border-2 p-1" on:click={() => loadCode(pyCode, 'python')}>Python</button>
		<button class="w-fit border-2 p-1" on:click={() => loadCode(htmlCode, 'html')}>HTML</button>
	</div>
	<div class="flex-grow" bind:this={editorElement} />
</div>