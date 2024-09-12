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
        <>
            <div className="mt-2">
                <div className="flex justify-center md:justify-end items-center gap-2 mb-5">
                    <input
                        id="search"
                        type="search"
                        value={filtering}
                        onChange={(e) => setFiltering(e.target.value)}
                        placeholder="Search"
                        className="input input-bordered w-full input-sm md:input-md max-w-xs"
                    />
                </div>
                <div className="overflow-x-auto overflow-y-hidden">
                    <table className="table w-full">
                        <thead className="bg-base-200 text-base-content">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            scope="col"
                                            className="px-4 py-2 border"
                                            key={header.id}
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            <div className="flex items-center gap-2 justify-center text-sm">
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )}
                                                {
                                                    {
                                                        asc: (
                                                            <FaCaretUp
                                                                size={14}
                                                            />
                                                        ),
                                                        desc: (
                                                            <FaCaretDown
                                                                size={14}
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
                                                className="px-4 py-2 border text-sm"
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
                                        className="px-4 py-2 text-center border"
                                        colSpan={columns.length}
                                    >
                                        No results
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center p-2">
                <span className="text-sm text-gray-700">
                    Showing{" "}
                    {data.length && table.getState().pagination.pageIndex + 1}{" "}
                    to {table.getPageCount()} of {table.getRowCount()} entries
                </span>
                <div className="flex justify-end items-center mt-5">
                    <button
                        onClick={() => table.firstPage()}
                        className="py-2 px-3 text-sm bg-white text-gray-700 border border-slate-300 hover:bg-blue-700 hover:text-white focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50 focus:outline-none focus:z-10 transition-color duration-100 rounded-l-md mb-2"
                    >
                        First
                    </button>
                    <button
                        onClick={() => table.previousPage()}
                        className="py-2 px-3 text-sm bg-white text-gray-700 border border-slate-300 hover:bg-blue-700 hover:text-white focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50 focus:outline-none focus:z-10 transition-color duration-100 mb-2"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => table.nextPage()}
                        className="py-2 px-3 text-sm bg-white text-gray-700 border border-slate-300 hover:bg-blue-700 hover:text-white focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50 focus:outline-none focus:z-10 transition-color duration-100 mb-2"
                    >
                        Next
                    </button>
                    <button
                        onClick={() => table.lastPage()}
                        className="py-2 px-3 text-sm bg-white text-gray-700 border border-slate-300 hover:bg-blue-700 hover:text-white focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50 focus:outline-none focus:z-10 transition-color duration-100 rounded-r-md mb-2"
                    >
                        Last
                    </button>
                </div>
            </div>
        </>
    );
};

export default DataTable;
