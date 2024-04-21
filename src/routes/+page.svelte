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
		}
	]);
</script>

<QTable {data} {schema} />
