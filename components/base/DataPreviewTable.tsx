"use client";

import * as React from "react";
import { faker } from "@faker-js/faker";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
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

export type Payment = {
  id: number;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const DataPreviewTable = (props: ApiGeneratorComponentProps) => {
  const [columns, setColumns] = React.useState<ColumnDef<Payment>[]>([]);
  const [data, setData] = React.useState<any>([]);

  useEffect(() => {
    const res = props.fields.map((column) => {
      return {
        accessorKey: column.id,
        header: column.name.toLocaleUpperCase(),
        cell: ({ row }: any) => (
          <div className={`${column.type == 'string' ? 'capitalize' :  ''} truncate overflow-hidden whitespace-nowrap`}>
            {row.getValue(column.id)}
          </div>
        ),
      };
    });

    // Add static ID column at the beginning
    res.unshift({
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <div className="capitalize truncate overflow-hidden whitespace-nowrap">
          {row.getValue("id")}
        </div>
      ),
    });

    // Generate dummy data
    let tempDataArray: any = [];
    for (let i = 1; i <= 20; i++) {
      let tempData: any = { id: i };
      props.fields.forEach((field) => {
        console.log(field)
        if (field.type == 'boolean') {
          tempData[field.id] = String(faker.datatype.boolean());
        } else if (field.type == 'number') {
          tempData[field.id] = faker.finance.amount();
        } else {
          tempData[field.id] = faker.person.fullName();
        }
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

  const isFewColumns = columns.length <= 4;

  const getColumnStyle = (columnId: string) => {
    if (isFewColumns) {
      return { width: `${100 / columns.length}%` };
    } else {
      return columnId === "id"
        ? { width: 60, maxWidth: 60 }
        : { width: 180, maxWidth: 180 };
    }
  };

  return (
    <div className="w-full rounded-md h-max overflow-auto">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-gray-100">
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="truncate overflow-hidden whitespace-nowrap"
                  style={getColumnStyle(header.column.id)}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header || 'COLUMN',
                      header.getContext()
                    )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="h-[37vh] md:h-[40vh] xl:h-auto">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="truncate overflow-hidden whitespace-nowrap"
                    style={getColumnStyle(cell.column.id)}
                  >
                    <div className="truncate w-full max-w-full cursor-default">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </div>
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
