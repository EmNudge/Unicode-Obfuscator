<script>
	import { transform } from './utils/transformText';
	import Prism from 'svelte-prism';
	import code from './utils/sampleCode';

	let value = '';
	
	$: output = transform(value);

	function copy() {
		navigator.clipboard.writeText(output);
	}
</script>

<main>
	<h1>Unicode Obfuscator</h1>

	<div class="code-input">
		<textarea bind:value placeholder="paste code here..."></textarea>
		<button on:click={() => value = code}>Sample Code</button>
	</div>

	<Prism language="javascript" source="{output}" />
	<button on:click={copy}>Copy Obfuscated Code</button>
</main>

<style>
	main {
    display: grid;
    justify-content: center;
		margin: 0 auto;
		margin-bottom: 100px;
		max-width: 800px;
	}

	.code-input {
		display: grid;
		grid-template-columns: 1fr auto;
		grid-gap: 5px;
	}
</style>