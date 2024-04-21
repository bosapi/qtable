<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	// @ts-ignore
	// import type { AnyPlugins } from 'svelte-headless-table/lib/types/TablePlugin';
	// @ts-ignore
	// import type { TableViewModel } from 'svelte-headless-table/lib/createViewModel';
	import { Plus } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import { QForm } from '@bosapi/qform';

	// export let tableModel: TableViewModel<any, AnyPlugins>;
	export let schema: any;
	export let isLoading: boolean = false;
	export let disabled: boolean = false;

	let open: boolean = false;
	let data: any = {};

	// const { pluginStates, flatColumns } = tableModel;
	// const { hiddenColumnIds } = pluginStates.hide;

	// const ids = flatColumns.map((col: { id: string }) => col.id);

	// let hideForId = Object.fromEntries(ids.map((id: string) => [id, true]));

	// $: $hiddenColumnIds = Object.entries(hideForId)
	// 	.filter(([, hide]) => !hide)
	// 	.map(([id]) => id);

	const dispatch = createEventDispatcher();

	function onSubmit({ detail }: any) {
		if (detail) {
			dispatch('submit', data);
			open = false;
		}
	}

	function onLoading({ detail }: any) {
		dispatch('loading', detail);
	}
</script>

<!-- <Button on:click={onClick} variant="default" size="sm" class="ml-auto h-8 flex">
	<Plus class="h-4 w-4" />
	<span class="ml-2 hidden sm:block">New</span>
</Button> -->

<Dialog.Root bind:open closeOnEscape={true} closeOnOutsideClick={true}>
	<Dialog.Trigger disabled={isLoading || disabled}>
		<Button variant="default" size="sm" class="ml-auto flex h-8" disabled={isLoading || disabled}>
			<Plus class="h-4 w-4" />
			<span class="ml-2 hidden sm:block">New</span>
		</Button>
	</Dialog.Trigger>
	<Dialog.Content class="max-h-[95%] max-w-[510px] overflow-auto">
		<Dialog.Header>
			<Dialog.Title>Tambah Data</Dialog.Title>
			<Dialog.Description>Jangan lupa klik tombol Simpan.</Dialog.Description>
		</Dialog.Header>
		<div class="max-w-[510px]">
			<QForm {isLoading} {data} {schema} on:submit={onSubmit} on:loading={onLoading} />
		</div>
	</Dialog.Content>
</Dialog.Root>
