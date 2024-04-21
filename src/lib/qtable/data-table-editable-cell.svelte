<script lang="ts">
	import { actionTable } from '$lib/store';

	export let value: string;
	export let width: string;
	export let orow: any;
	export let params: any = {};
	export let name: string;

	let isEditing = false;
	let lastValue = value;

	function onSubmit() {
		actionTable.set({ id: orow?.id, action: 'edit-cell', name: name, params, value });
		isEditing = false;
		lastValue = value;
	}

	function onCancel() {
		value = lastValue;
		isEditing = false;
	}
</script>

{#if isEditing}
	<form on:submit|preventDefault={onSubmit}>
		<div class="flex gap-2" title={`width ${width} is not implemented yet`}>
			<!-- svelte-ignore a11y-autofocus -->
			<input
				autofocus={true}
				class="w-[50px] border px-2 py-0 text-center"
				bind:value
				name={params.key}
				on:blur={onCancel}
			/>
		</div>
	</form>
{:else}
	<button class="w-[50px]" on:dblclick={() => (isEditing = true)}>{value || '-'}</button>
{/if}
