import { useEffect, useState } from 'react'

import asc from "../../assets/vectors/table/asc.svg";
import desc from "../../assets/vectors/table/desc.svg";
import unsorted from "../../assets/vectors/table/unsorted.svg";

import './table.css'

import {
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	getPaginationRowModel,
	useReactTable,
} from '@tanstack/react-table'


export default function Table({ rowData, columns, title }) {

	const [sorting, setSorting] = useState([{
		"id": "uuid",
		"desc": true
	}])

	const [data, setData] = useState(rowData);

	useEffect(() => {
		setData(rowData);
	}, [rowData]);

	const table = useReactTable({
		data,
		columns,
		state: {
		sorting,
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	})

	return (
		<div className="custom-table">
			<h2>{title}</h2>
			<table>
				<thead>
					{table.getHeaderGroups().map(headerGroup => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map(header => {
								return (
									<th key={header.id} colSpan={header.colSpan}>
										{header.isPlaceholder ? null : (
											<div
												{...{
												className: header.column.getCanSort()
													? 'cursor-pointer select-none'
													: '',
												onClick: header.column.getToggleSortingHandler(),
												}}
												>
												{flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
												{!header.column.getIsSorted() && <img src={unsorted} alt=""/>}
												{header.column.getIsSorted() === "asc" ? <img src={asc} alt="" /> : ""}
												{header.column.getIsSorted() === "desc" ? <img src={desc} alt="" /> : ""}
											</div>
										)}
									</th>
								)
							})}
						</tr>
					))}
				</thead>
				<tbody>
					{table
						.getRowModel()
						.rows.map(row => {
						return (
							<tr key={row.id}>
								{row.getVisibleCells().map(cell => {
									return (
										<td key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</td>
									)
								})}
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}
