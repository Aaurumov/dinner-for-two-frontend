<script>
// @ts-nocheck

	import { createEventDispatcher } from 'svelte';
	const distpatch = createEventDispatcher();
	export let items;
	export let activeItem;


</script>

<div class="tabs">
	<ul>
		{#each items as item}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<li on:click={() => distpatch('tabChange', item)}>
				<div class:active={item === activeItem}>{item}</div>
			</li>
		{/each}
	</ul>
</div>

<style>
	.tabs {
		margin-bottom: 00px;
		
	}
	ul {
		display: flex;
		justify-content: center;
		padding: 0;
		list-style-type: none;
		
	}
	li {
		margin-inline: 2% 1%;
		writing-mode: horizontal-tb;
		font-size: 16px;
		color: black;
		cursor: pointer;
		
	}
	.active {
		color: goldenrod;
		border-bottom: 2px solid goldenrod;
		padding-bottom: 8px;
	}
</style>
