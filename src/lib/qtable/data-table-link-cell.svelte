<script lang="ts">
	import { navigating, page } from '$app/stores';

	export let value: string;
	export let width: string;
	export let orow: any;
	export let params: any;
	export let name: string = '';

	function generateHref() {
		const betweens = params?.link.match(/(?<=\{).+?(?=\})/g);
		if (!betweens) return params?.link;
		if (betweens && betweens.length === 0) return params?.link;
		let ulink = params?.link;
		for (const item of betweens) {
			let val = orow[item];
			ulink = ulink.replace(new RegExp(`{${item}}`, 'g'), val || '');
		}
		return ulink;
	}
</script>

{#if generateHref() === $page.url.pathname}
	<div class="flex space-x-2" title={`name: ${name} is not implemented yet`}>
		<span style={width ? `width: ${width}` : 'auto'} class="truncate font-medium">
			{value || '-'}
		</span>
	</div>
{:else}
	<a
		href={$navigating ? null : generateHref()}
		title={value}
		class="text-blue-600 hover:text-blue-400 hover:underline dark:text-blue-300"
		target={params?.target || '_self'}
	>
		<div class="flex space-x-2">
			<span style={width ? `width: ${width}` : 'auto'} class="truncate font-medium">
				{value || '-'}
			</span>
		</div>
	</a>
{/if}
