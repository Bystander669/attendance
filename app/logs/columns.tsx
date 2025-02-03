"use client";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import type { ColumnDef } from "@tanstack/react-table";

export type LogEntry = {
  id: string;
  username: string;
  checkIn: Date;
  checkOut: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<LogEntry>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const id: string = row.getValue("id");
      return id.slice(0, 8); // Show only the first 8 characters of the ID
    },
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "checkIn",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Check In" />
    ),
    cell: ({ row }) => {
      const date: Date = row.getValue("checkIn");
      return formatDate(date);
    },
  },
  {
    accessorKey: "checkOut",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Check Out" />
    ),
    cell: ({ row }) => {
      const date: Date | null = row.getValue("checkOut");
      return date ? formatDate(date) : "N/A";
    },
  },
];

function formatDate(date: Date): string {
  return date.toUTCString().split(" GMT")[0];
}
