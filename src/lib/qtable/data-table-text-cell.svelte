<script lang="ts">
	export let value: string;
	export let width: string;
</script>

<div class="flex space-x-2">
	<span style={width ? `width: ${width}` : 'auto'} class="truncate">
		{value || '-'}
	</span>
</div>
