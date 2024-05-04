<script lang="ts">
	import { readable, writable, type Readable } from 'svelte/store';
	import { Render, Subscribe, createTable } from 'svelte-headless-table';
	import * as Table from '$lib/components/ui/table';
	import {
		addColumnFilters,
		addHiddenColumns,
		addPagination,
		addSelectedRows,
		addSortBy,
		addTableFilter
	} from 'svelte-headless-table/plugins';
	import { DataTableColumnHeader, DataTableToolbar, DataTablePagination } from '.';
	import { generateColumns } from './helper.js';
	import Loading from '$lib/components/base/loading.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import { authUser } from '$lib/store.js';

	export let data: Readable<any[]> = readable([]);
	export let schema: any;
	export let isLoading = false;
	export let bodyOnly = false;
	export let toolbarOptions: any = {};
	export let auth: any = {};

	function getData() {
		if (!data) return writable([]);
		if (!$data) return writable([]);
		if ($data.length === 0) return writable([]);
		return data;
	}

	const table = createTable(getData(), {
		select: addSelectedRows(),
		sort: addSortBy({
			toggleOrder: ['asc', 'desc']
		}),
		page: addPagination(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => {
				return value.toLowerCase().includes(filterValue.toLowerCase());
			}
		}),
		colFilter: addColumnFilters(),
		hide: addHiddenColumns()
	});

	const columns = generateColumns(table, schema, auth);
	const tableModel = table.createViewModel(columns);
	const { headerRows, pageRows, tableAttrs, tableBodyAttrs } = tableModel;

	onMount(() => {
		setTimeout(() => {
			isLoading = false;
		}, 5000);
	});

	const dispatch = createEventDispatcher();

	function onSubmit({ detail }: any) {
		dispatch('submit', detail);
	}

	function onLoading({ detail }: any) {
		dispatch('loading', detail);
	}
</script>

<div class="space-y-4">
	{#if !bodyOnly}
		<DataTableToolbar
			{tableModel}
			{schema}
			on:submit={onSubmit}
			on:loading={onLoading}
			{toolbarOptions}
			{isLoading}
			{auth}
		/>
	{/if}
	<div class="rounded-md border">
		<Table.Root {...$tableAttrs}>
			<Table.Header>
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
									<Table.Head {...attrs}>
										{#if cell.id !== 'select' && cell.id !== 'actions'}
											<DataTableColumnHeader {props}>
												<Render of={cell.render()} />
											</DataTableColumnHeader>
										{:else if !bodyOnly}
											<Render of={cell.render()} />
										{/if}
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>
			<Table.Body {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<Table.Row {...rowAttrs}>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell {...attrs}>
										{#if cell.id !== 'select' && cell.id !== 'actions'}
											<Render of={cell.render()} />
										{:else if !bodyOnly}
											<Render of={cell.render()} />
										{/if}
									</Table.Cell>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
	{#if $pageRows.length === 0}
		<div class="border-b">
			<Loading {isLoading} />
		</div>
	{/if}
	{#if !bodyOnly}
		<DataTablePagination {tableModel} />
	{/if}
</div>
