import type { Schema } from '$lib/components/qform/helper';
import { createRender } from 'svelte-headless-table';
import { get } from 'svelte/store';
import * as CellType from '.';

function generateActionTable(table: any, schema: any, auth: any) {
	return table.display({
		id: 'actions',
		header: () => {
			return '';
		},
		cell: ({ row }: any) => {
			if (row.isData() && row.original) {
				return createRender(CellType['DataTableRowActions'], {
					orow: row.original,
					name: schema.name,
					auth,
					schema
				});
			}
			return '';
		},
		plugins: {
			sort: {
				disable: true
			}
		}
	});
}

export const uid = (length: number = 16) => {
	let n = Math.ceil(Math.random() * 10 ** length).toString(36);
	n = n.replace('.', '');
	return n.toUpperCase();
};

export const generateColumns = (table: any, schema: Schema, auth: any = {}, actionPosition: string = 'right') => {
	const columns: any = [];
	const schemaProp = schema.properties;

	// add select
	columns.push(
		table.display({
			id: 'select',
			header: (_: any, { pluginStates }: any) => {
				const { allPageRowsSelected } = pluginStates.select;
				return createRender(CellType['DataTableCheckbox'], {
					checked: allPageRowsSelected,
					'aria-label': 'Select all'
				});
			},
			cell: ({ row }: any, { pluginStates }: any) => {
				const { getRowState } = pluginStates.select;
				const { isSelected } = getRowState(row);
				return createRender(CellType['DataTableCheckbox'], {
					checked: isSelected,
					'aria-label': 'Select row',
					class: 'translate-y-[2px]'
				});
			},
			plugins: {
				sort: {
					disable: true
				}
			}
		})
	);

	if (actionPosition === 'left') {
		columns.push(generateActionTable(table, schema, auth));
	}

	/**
	 * Start here we will generate the rest of columns
	 */
	for (const key in schemaProp) {
		if (schemaProp[key].options?.table?.show === false) continue;
		columns.push(
			table.column({
				accessor: key,
				header: schemaProp[key].label,
				id: key,
				cell: ({ value, row }: any) => {
					if (
						schemaProp[key].options?.table?.cell_type &&
						schemaProp[key].options?.table?.cell_type?.use_row_data === true
					) {
						// @ts-ignore
						return createRender(CellType[schemaProp[key].options?.table?.cell_type.name], {
							value,
							orow: row.original,
							params: { ...schemaProp[key].options?.table?.cell_type?.params, key },
							width: schemaProp[key].options?.table?.width || 'auto',
							name: schema.name
						});
					} else if (schemaProp[key].options?.table?.cell_type) {
						// @ts-ignore
						return createRender(CellType[schemaProp[key].options?.table?.cell_type.name], {
							value,
							width: schemaProp[key].options?.table?.width || 'auto'
						});
					} else {
						return createRender(CellType['CellText'], {
							value,
							width: schemaProp[key].options?.table?.width || 'auto'
						});
					}
					// return value ? value : '-';
				},
				plugins: {
					sort: {
						disable: !schemaProp[key].options?.table?.sort
					},
					colFilter: {
						fn: ({ filterValue, value }: any) => {
							if (filterValue.length === 0) return true;
							if (!Array.isArray(filterValue) || typeof value !== 'string') return true;
							return filterValue.some((filter) => {
								return value.includes(filter);
							});
						},
						initialFilterValue: [],
						render: ({ filterValue }: any) => {
							return get(filterValue);
						}
					}
				}
			})
		);
	}

	if (actionPosition !== 'left') {
		// add action to the end;
		columns.push(generateActionTable(table, schema, auth));
	}

	return table.createColumns(columns);
};
