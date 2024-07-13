<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { MoreHorizontal, Pencil, Trash } from 'lucide-svelte';
	import { actionTable } from '$lib/store';
	import * as Dialog from '$lib/components/ui/dialog';
	import { QForm } from '@bosapi/qform';

	export let orow: any;
	export let name: string = '';
	export let auth: any = {};
	export let isLoading: boolean = false;
	export let schema: any;
	export let useActionButton: boolean = false;
	export let useExternalActionCallback: boolean = false;

	let open = false;

	function onDelete() {
		if (confirm('Apakah Anda yakin?')) {
			actionTable.set({
				id: orow?.id,
				action: 'remove',
				name: name,
				data: editableOnly(schema, orow)
			});
		}
	}

	function onEdit() {
		if (useExternalActionCallback) {
			actionTable.set({
				id: orow?.id,
				action: 'edit',
				name: name,
				data: editableOnly(schema, orow)
			});
		} else {
			open = true;
		}
	}

	function editableOnly(schema: any, odata: any) {
		const data = JSON.parse(JSON.stringify(odata));
		const props = schema.properties;
		// uneditable: id, form show false, form options editable false
		for (const key in data) {
			if (
				props[key] === undefined ||
				data[key] === null ||
				key === 'id' ||
				props[key]?.options?.form?.show === false ||
				props[key]?.options?.form?.editable === false
			) {
				delete data[key];
			}
		}
		return data;
	}

	function onUpdate({ detail }: any) {
		if (detail) {
			actionTable.set({
				id: orow?.id,
				action: 'update',
				name: name,
				data: editableOnly(schema, orow)
			});
			open = false;
		}
	}

	function onLoading({ detail }: any) {
		isLoading = detail;
	}
</script>

{#if useActionButton}
	<div class="flex items-center justify-center gap-2">
		<Button on:click={onEdit} disabled={!auth.update} size="icon" variant="secondary"
			><Pencil /></Button
		>
		<Button on:click={onDelete} disabled={!auth.delete} size="icon" variant="destructive"
			><Trash /></Button
		>
	</div>
{:else}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger asChild let:builder>
			<Button
				variant="ghost"
				builders={[builder]}
				class="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
			>
				<MoreHorizontal class="h-4 w-4" />
				<span class="sr-only">Open menu</span>
			</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content class="w-[160px]">
			<!-- <DropdownMenu.Separator /> -->
			<DropdownMenu.Item on:click={onEdit} disabled={!auth.update}>Edit</DropdownMenu.Item>
			<DropdownMenu.Item on:click={onDelete} disabled={!auth.delete}>Delete</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{/if}

<Dialog.Root bind:open closeOnEscape={true} closeOnOutsideClick={true}>
	<Dialog.Content class="max-h-[95%] max-w-[510px] overflow-auto">
		<Dialog.Header>
			<Dialog.Title>Update Data</Dialog.Title>
			<Dialog.Description>Click Save when you're done.</Dialog.Description>
		</Dialog.Header>
		<div class="max-w-[510px]">
			<QForm
				{isLoading}
				data={orow}
				{schema}
				on:submit={onUpdate}
				on:loading={onLoading}
				action="UPDATE"
			/>
		</div>
	</Dialog.Content>
</Dialog.Root>
