import React, { useState } from "react";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import { FaCaretUp, FaCaretDown } from "react-icons/fa";

const DataTable = ({ columns, data }) => {
    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState("");

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting: sorting,
            globalFilter: filtering,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
    });

    return (
        <div className="space-y-2 mt-5">
            {/* Search Input */}
            <div className="flex justify-center md:justify-end items-center gap-2">
                <input
                    id="search"
                    type="search"
                    value={filtering}
                    onChange={(e) => setFiltering(e.target.value)}
                    placeholder="Search"
                    className="input input-bordered w-full input-sm md:input-md max-w-xs"
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto overflow-y-hidden">
                <table className="table w-full">
                    <thead className="bg-base-200 text-base-content uppercase">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        scope="col"
                                        className="px-4 py-8 border"
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        <div className="flex items-center gap-2 justify-center text-sm">
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {
                                                {
                                                    asc: (
                                                        <FaCaretUp size={17} />
                                                    ),
                                                    desc: (
                                                        <FaCaretDown
                                                            size={17}
                                                        />
                                                    ),
                                                }[
                                                    header.column.getIsSorted() ??
                                                        null
                                                ]
                                            }
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="text-base-content">
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <tr
                                    key={row.id}
                                    className="odd:bg-base-100 even:bg-base-200 border-t"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <td
                                            className="px-4 py-8 border text-sm"
                                            key={cell.id}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    className="px-4 py-8 text-center border"
                                    colSpan={columns.length}
                                >
                                    No results
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
                <span className="text-sm text-gray-700">
                    {`Showing ${
                        data.length && table.getState().pagination.pageIndex + 1
                    } to ${table.getPageCount()}  of ${table.getRowCount()} entries`}
                </span>
                <div className="join">
                    <button
                        type="button"
                        onClick={() => table.firstPage()}
                        className="join-item btn btn-sm md:btn-md"
                    >
                        First
                    </button>
                    <button
                        type="button"
                        onClick={() => table.previousPage()}
                        className="join-item btn btn-sm md:btn-md"
                    >
                        Previous
                    </button>
                    <button
                        type="button"
                        onClick={() => table.nextPage()}
                        className="join-item btn btn-sm md:btn-md"
                    >
                        Next
                    </button>
                    <button
                        type="button"
                        onClick={() => table.lastPage()}
                        className="join-item btn btn-sm md:btn-md"
                    >
                        Last
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DataTable;
