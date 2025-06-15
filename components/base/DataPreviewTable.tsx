"use client";
import * as React from "react";
import { faker } from "@faker-js/faker";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ApiGeneratorComponentProps } from "../types";
import { useEffect } from "react";

// const data: Payment[] = [
//   {
//     id: 1,
//     amount: 316,
//     status: "success",
//     email: "ken99@yahoo.com",
//   },
//   {
//     id: 2,
//     amount: 242,
//     status: "success",
//     email: "Abe45@gmail.com",
//   },
//   {
//     id: 3,
//     amount: 837,
//     status: "processing",
//     email: "Monserrat44@gmail.com",
//   },
// ];

export type Payment = {
  id: number;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

// export const columns: ColumnDef<Payment>[] = [
//   {
//     accessorKey: "status",
//     header: "Status",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("status")}</div>
//     ),
//   },
// ];

export const DataPreviewTable = (props: ApiGeneratorComponentProps) => {
  const [columns, setColumns] = React.useState<ColumnDef<Payment>[]>([
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
    },
  ]);
  const [data, setData] = React.useState<any>([]);

  useEffect(() => {
    const res = props.fields.map((column) => {
      return {
        accessorKey: column.name,
        header: column.name,
        cell: ({ row }: any) => (
          <div className="capitalize">{row.getValue(column.name)}</div>
        ),
      };
    });
    res.unshift({
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
    });
    setData([]);
    let tempDataArray: any = [];
    for (let i = 1; i <= 5; i++) {
      let tempData: any = {};
      tempData.id = i;

      props.fields.forEach((field) => {
        tempData[field.name] = faker.person.fullName();
      });
      tempDataArray.push(tempData);
    }
    setData(tempDataArray);
    setColumns(res);
  }, [props.fields]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full rounded-md h-max">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="h-[37vh] md:h-[40vh] xl:h-auto">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
