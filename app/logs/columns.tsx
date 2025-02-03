"use client";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import type { ColumnDef } from "@tanstack/react-table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
      const shortId = id.slice(0, 8) + "...";
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>{shortId}</TooltipTrigger>
            <TooltipContent>
              <p>{id}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
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
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short", // 'long' for full name, 'short' for abbreviated name
    year: "numeric",
    month: "short", // 'long' for full month name, 'short' for abbreviated month
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // Use 24-hour format; set to true for 12-hour format
  };

  return date.toLocaleString(undefined, options);
}
