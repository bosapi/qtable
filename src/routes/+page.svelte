<script lang="ts">
	import { QTable } from '$lib/index.js';
	import { writable } from 'svelte/store';
	const schema = {
		name: 'identity',
		properties: {
			id: {
				type: 'text',
				label: 'ID',
				disabled: true,
				options: {
					table: {
						show: false
					},
					form: {
						show: false
					}
				}
			},
			user: {
				type: 'text',
				label: 'User 1',
				options: {
					form: {
						show: false
					},
					table: {
						cell_type: {
							name: 'CellLink',
							use_row_data: true,
							params: {
								link: '/some/link/{id}'
							}
						}
					}
				}
			},
			is_active: {
				type: 'checkbox',
				label: 'Aktif',
				description: 'Hanya yang aktif yang bisa diubah di halaman Dosen.',
				default: true,
				options: {
					table: {
						cell_type: {
							name: 'CellYesNo'
						}
					}
				}
			},
			submit: {
				type: 'submit',
				label: 'Simpan',
				options: {
					variant: 'default',
					table: {
						show: false
					}
				}
			}
		}
	};

	const data = writable([
		{
			id: 1,
			user: 'User 1',
			is_active: true
		},
		{
			id: 2,
			user: 'User 2',
			is_active: true
		},
		{
			id: 3,
			user: 'User 3',
			is_active: true
		},
		{
			id: 4,
			user: 'User 4',
			is_active: true
		},
		{
			id: 5,
			user: 'User 5',
			is_active: true
		},
		{
			id: 6,
			user: 'User 6',
			is_active: true
		},
		{
			id: 7,
			user: 'User 7',
			is_active: true
		},
		{
			id: 8,
			user: 'User 8',
			is_active: true
		},
		{
			id: 9,
			user: 'User 9',
			is_active: true
		},
		{
			id: 10,
			user: 'User 10',
			is_active: true
		},
		{
			id: 11,
			user: 'User 11',
			is_active: true
		},
		{
			id: 12,
			user: 'User 12',
			is_active: true
		}
	]);

	function onChange({ detail }: any) {
		console.log('onChange', detail);
	}
</script>

<QTable {data} {schema} hideToolbar={false} serverItemCount={writable(100)} on:change={onChange} />
