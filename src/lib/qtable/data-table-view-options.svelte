<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	// @ts-ignore
	import type { AnyPlugins } from 'svelte-headless-table/lib/types/TablePlugin';
	// @ts-ignore
	import type { TableViewModel } from 'svelte-headless-table/lib/createViewModel';
	import { Settings2 } from 'lucide-svelte';

	export let tableModel: TableViewModel<any, AnyPlugins>;
	const { pluginStates, flatColumns } = tableModel;
	const { hiddenColumnIds } = pluginStates.hide;

	const ids = flatColumns.map((col: { id: string }) => col.id);

	let hideForId = Object.fromEntries(ids.map((id: string) => [id, true]));

	$: $hiddenColumnIds = Object.entries(hideForId)
		.filter(([, hide]) => !hide)
		.map(([id]) => id);
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="outline" size="sm" class="ml-auto flex h-8" builders={[builder]}>
			<Settings2 class="h-4 w-4" />
			<span class="ml-2 hidden sm:block">View</span>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Label>Toggle columns</DropdownMenu.Label>
		<DropdownMenu.Separator />
		{#each flatColumns as col}
			{#if col.id !== 'select' && col.id !== 'actions'}
				<DropdownMenu.CheckboxItem bind:checked={hideForId[col.id]}>
					{col.header}
				</DropdownMenu.CheckboxItem>
			{/if}
		{/each}
	</DropdownMenu.Content>
</DropdownMenu.Root>
