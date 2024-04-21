<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	// @ts-ignore
	import type { AnyPlugins } from 'svelte-headless-table/lib/types/TablePlugin';
	// @ts-ignore
	import type { TableViewModel } from 'svelte-headless-table/lib/createViewModel';
	import { UploadCloud } from 'lucide-svelte';

	export let tableModel: TableViewModel<any, AnyPlugins>;
	// const { pluginStates, flatColumns } = tableModel;
	// const { hiddenColumnIds } = pluginStates.hide;

	// const ids = flatColumns.map((col: { id: string }) => col.id);

	// let hideForId = Object.fromEntries(ids.map((id: string) => [id, true]));

	// $: $hiddenColumnIds = Object.entries(hideForId)
	// 	.filter(([, hide]) => !hide)
	// 	.map(([id]) => id);

	function onClick() {
		alert('Sorry, this feature is under contruction.');
	}
</script>

<Button on:click={onClick} variant="secondary" size="sm" class="ml-auto flex h-8">
	<UploadCloud class="h-4 w-4" />
	<span class="ml-2 hidden sm:block">Import</span>
</Button>
