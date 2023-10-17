<!-- <script lang="ts">
	import CodeEditor from '$lib/components/CodeEditor.svelte';
</script>

<CodeEditor /> -->
<script lang="ts">
	import Monaco from '$lib/components/Monaco.svelte';
	let cEditor: Monaco;
	const handleSubmit = (ev: any) => {
		console.log(ev);
		console.log(cEditor.getValue());
	};
</script>

<svelte:head>
	<title>Run Query</title>
</svelte:head>

<h1 class="text-2xl font-bold text-red-700">Run Query</h1>
<!-- on:submit|trusted|preventDefault={handleSubmit} -->
<form on:submit|preventDefault={handleSubmit}>
	<!-- 	method="POST"
	action="/serveQuery"
	class="mx-5 flex flex-col space-y-3"
	enctype="multipart/form-data" -->
	<!-- <div>
		<label aria-controls="returnType" for="returnType"> Return as </label>
		<input type="radio" name="returnType" value="json" checked /> JSON
		<input type="radio" name="returnType" value="csv" /> CSV
		<input type="radio" name="returnType" value="text" /> Text
	</div>
	<br />
	<textarea name="query" class="bg-gray-200" /> -->
	<Monaco language="sql" bind:this={cEditor} />
	<button type="submit" class="bg-blue-300 border-blue-600 justify-center w-max p-3"
		>Run Query</button
	>
</form>
