<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { DataTableFacetedFilter, DataTableViewOptions } from '.';
	// @ts-ignore
	import type { AnyPlugins } from 'svelte-headless-table/lib/types/TablePlugin';
	// @ts-ignore
	import type { TableViewModel } from 'svelte-headless-table/lib/createViewModel';
	import Button from '$lib/components/ui/button/button.svelte';
	// import { statuses, priorities } from './data';
	import type { Writable } from 'svelte/store';
	import { X } from 'lucide-svelte';
	import DataTableAddData from './data-table-add-data.svelte';
	// import DataTableImportData from './data-table-import-data.svelte';
	// import DataTableExportData from './data-table-export-data.svelte';
	import { createEventDispatcher } from 'svelte';
	import DataTableCustomAddData from './data-table-custom-add-data.svelte';
	import { uid } from './helper.js';

	export let tableModel: TableViewModel<any, AnyPlugins>;
	export let schema: any;
	export let toolbarOptions: any = {};
	export let isLoading = false;
	export let auth: any = {};
	export let useExternalActionCallback: boolean = false;

	const { pluginStates } = tableModel;
	const {
		filterValue
	}: {
		filterValue: Writable<string>;
	} = pluginStates.filter;

	const {
		filterValues
	}: {
		filterValues: Writable<{
			status: string[];
			priority: string[];
		}>;
	} = pluginStates.colFilter;

	$: showReset = Object.values($filterValues).some((v) => v.length > 0);

	const dispatch = createEventDispatcher();

	function onSubmit({ detail }: any) {
		dispatch('submit', detail);
	}

	function onLoading({ detail }: any) {
		dispatch('loading', detail);
	}
</script>

<div class="flex flex-wrap items-center justify-between gap-2">
	<div class="flex flex-1 items-center space-x-2">
		<Input
			id={uid()}
			placeholder="Filter data..."
			class="h-8 w-[150px] lg:w-[250px]"
			type="text"
			bind:value={$filterValue}
		/>

		<!-- <DataTableFacetedFilter
			bind:filterValues={$filterValues.status}
			title="Tahun"
			options={statuses}
		/> -->
		<!-- <DataTableFacetedFilter
			bind:filterValues={$filterValues.priority}
			title="Priority"
			options={priorities}
		/> -->
		{#if showReset}
			<Button
				on:click={() => {
					$filterValues.status = [];
					$filterValues.priority = [];
				}}
				variant="ghost"
				class="h-8 px-2 lg:px-3"
			>
				Reset
				<X class="ml-2 h-4 w-4" />
			</Button>
		{/if}
	</div>

	<DataTableViewOptions {tableModel} />
	<!-- <DataTableExportData {tableModel} /> -->
	<!-- <DataTableImportData {tableModel} /> -->
	<!-- {#if toolbarOptions?.hideToolbar !== true} -->
	{#if !toolbarOptions?.hideAddButton}
		{#if toolbarOptions?.useCustomAddButton}
			<DataTableCustomAddData
				{schema}
				on:submit={onSubmit}
				on:loading={onLoading}
				{isLoading}
				disabled={!auth.create}
			/>
		{:else}
			<DataTableAddData
				{schema}
				on:submit={onSubmit}
				on:loading={onLoading}
				{isLoading}
				{useExternalActionCallback}
				disabled={!auth.create}
			/>
		{/if}
	{/if}
	<!-- {/if} -->
</div>
