<script lang="ts">
	import { get, writable, type Writable } from 'svelte/store';
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
	// import { authUser } from '$lib/store.js';

	export let data: Writable<any[]> = writable([]);
	export let schema: any;
	export let isLoading = false;
	export let bodyOnly = false;
	export let toolbarOptions: any = {};
	export let hideToolbar = false;
	export let auth: any = {};
	export let actionPosition: string = 'right';
	export let serverSide: boolean = true;
	export let serverItemCount: Writable<number> = writable(10);
	export let keyword: string = '';
	export let initialPageIndex: number = 0;
	export let initialPageSize: number = 10;
	export let useActionButton: boolean = false;
	export let useExternalActionCallback: boolean = false;

	let isFiltering = false;
	let timeoutIndex: number;

	// TODO: Fix this bug
	let lastKeyword = '';

	// function getData() {
	// 	if (!data) return writable([]);
	// 	if (!$data) return writable([]);
	// 	if ($data.length === 0) return writable([]);
	// 	return data;
	// }

	function resetPageIndex() {
		if (!tableModel) return;
		const { pageIndex } = tableModel.pluginStates.page;
		const pIndex = get(pageIndex);
		if (pIndex > 0) {
			pageIndex.set(0);
		}
	}

	function filterToServer(filterValue: string) {
		isFiltering = true;
		keyword = filterValue;
		clearTimeout(timeoutIndex);
		timeoutIndex = setTimeout(() => {
			isFiltering = false;
			updateFilter();
		}, 1000);
		return true;
	}

	const table = createTable(data, {
		select: addSelectedRows(),
		sort: addSortBy({
			toggleOrder: ['asc', 'desc']
		}),
		page: addPagination({
			serverSide,
			serverItemCount,
			initialPageIndex,
			initialPageSize
		}),
		filter: addTableFilter({
			serverSide,
			fn: ({ filterValue, value }) => {
				return filterToServer(filterValue);
			}
		}),
		colFilter: addColumnFilters(),
		hide: addHiddenColumns()
	});

	const columns = generateColumns(
		table,
		schema,
		auth,
		actionPosition,
		useActionButton,
		useExternalActionCallback
	);
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

	function updatePageIndex({ detail }: any) {
		if (isFiltering) return;
		onChange();
	}

	function updatePageSize({ detail }: any) {
		onChange();
	}

	function updateFilter() {
		if (lastKeyword == keyword) return;
		lastKeyword = keyword;
		resetPageIndex();
		onChange();
	}

	function onChange() {
		const { pageSize, pageIndex } = tableModel.pluginStates.page;
		const _pageSize = get(pageSize);
		const _pageIndex = get(pageIndex);
		// const offset = pIndex > 0 ? limit * pIndex : 0;
		const detail = {
			keyword,
			pageSize: _pageSize,
			pageIndex: _pageIndex
		};
		dispatch('change', detail);
	}
</script>

<div class="space-y-4">
	{#if !bodyOnly && !hideToolbar}
		<DataTableToolbar
			{tableModel}
			{schema}
			on:submit={onSubmit}
			on:loading={onLoading}
			{toolbarOptions}
			{isLoading}
			{auth}
			{useExternalActionCallback}
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
		<DataTablePagination
			{tableModel}
			on:updatePageIndex={updatePageIndex}
			on:updatePageSize={updatePageSize}
		/>
	{/if}
</div>
