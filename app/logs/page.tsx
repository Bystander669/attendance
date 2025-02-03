import { prisma } from "@/lib/prisma";
import { LogEntry, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<LogEntry[]> {
  try {
    const logEntries = await prisma.logEntry.findMany({
      orderBy: {
        createdAt: "desc", // Optional: sort by most recent entries first
      },
    });
    return logEntries;
  } catch (error) {
    console.error("Error fetching log entries:", error);
    return []; // Return empty array if fetch fails
  }
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
