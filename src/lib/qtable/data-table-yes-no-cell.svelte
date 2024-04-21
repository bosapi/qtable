<script lang="ts">
	import { CheckCircle, StopCircle } from 'lucide-svelte';

	export let value: string | boolean | number;
	export let width: number;
</script>

{#if value === true || Number(value || '0') > 0}
	<div class="flex items-center text-sm font-medium text-green-700 dark:text-green-300">
		<CheckCircle class="mr-1 h-4 w-4" />Yes
	</div>
{:else if value === false || value === 0}
	<div class="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
		<StopCircle class="mr-1 h-4 w-4" />No
	</div>
{:else}
	<div
		title={`Width: ${width} is not implemented yet`}
		class="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300"
	>
		-
	</div>
{/if}
