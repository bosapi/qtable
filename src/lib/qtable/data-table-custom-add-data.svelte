<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { actionTable } from '$lib/store';
	import { Plus } from 'lucide-svelte';
	import type { Schema } from '../qform/helper';

	export let schema: Schema;
	export let isLoading: boolean = false;
	export let disabled: boolean = false;

	function onClick() {
		actionTable.set({ id: '', action: 'custom-add-button', name: schema.name });
	}
</script>

<Button
	on:click={onClick}
	variant="default"
	size="sm"
	class="ml-auto flex h-8"
	disabled={isLoading || disabled}
>
	<Plus class="h-4 w-4" />
	<span class="ml-2 hidden sm:block">New</span>
</Button>
