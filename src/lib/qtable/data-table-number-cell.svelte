<script lang="ts">
	export let value: number;
	export let width: string;

	function round(val: number | string) {
		if (!val) return val;
		if (typeof val === 'string') val = parseFloat(val);
		// return Math.round((val + Number.EPSILON) * 100) / 100;
		return val.toFixed(2);
	}

	function roundValue() {
		return round(value);
	}
</script>

<div class="flex space-x-2">
	<span style={width ? `width: ${width}` : 'auto'} class="truncate">
		{roundValue() || '-'}
	</span>
</div>
