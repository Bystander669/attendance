import { prisma } from "@/lib/prisma";
import { createLogEntry, checkoutUser } from "./actions/prismaActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, LogIn, LogOut } from "lucide-react";

export default async function CheckInPage() {
  const checkedInUsers = await prisma.logEntry.findMany({
    where: {
      createdAt: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
      },
    },
    orderBy: {
      checkIn: "desc",
    },
  });

  return (
    <div className="container mx-auto p-4 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>User Check-In</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createLogEntry} className="flex space-x-2">
            <Input
              type="text"
              name="username"
              placeholder="Enter Username"
              className="flex-grow"
              required
            />
            <Button type="submit">
              <LogIn className="mr-2 h-4 w-4" />
              Check In
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Users ({checkedInUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Check-In Time</TableHead>
                <TableHead>Check-Out Time</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {checkedInUsers.map((user) => (
                <TableRow
                  key={user.id}
                  className={user.checkOut ? "text-muted-foreground" : ""}
                >
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>{user.checkIn.toLocaleString()}</TableCell>
                  <TableCell>
                    {user.checkOut ? user.checkOut.toLocaleString() : "-"}
                  </TableCell>
                  <TableCell>
                    {!user.checkOut ? (
                      <form action={checkoutUser}>
                        <input type="hidden" name="id" value={user.id} />
                        <Button variant="destructive" size="sm" type="submit">
                          <LogOut className="mr-2 h-4 w-4" />
                          Check Out
                        </Button>
                      </form>
                    ) : (
                      <CheckCircle className="text-green-500 h-5 w-5" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
