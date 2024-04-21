<script lang="ts">
	import { Loader } from 'lucide-svelte';

	export let isLoading: boolean = true;
</script>

{#if isLoading}
	<div class="my-3 flex w-full justify-center text-muted-foreground">
		<Loader class="mr-3 animate-spin" /> Mohon tunggu...
	</div>
{:else}
	<div class="my-3 w-full text-center text-muted-foreground">Tidak ada data...</div>
{/if}
