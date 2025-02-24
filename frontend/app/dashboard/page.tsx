'use client';

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// Subscription schema for form validation
const subscriptionSchema = z.object({
  name: z.string().min(1, "Subscription name is required"),
  cost: z.number().min(0, "Cost must be a positive number"),
  renewalDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Enter a valid date (YYYY-MM-DD)"),
});

type Subscription = z.infer<typeof subscriptionSchema>;

// Mock data (replace with API fetch later)
const initialSubscriptions: Subscription[] = [
  { name: "Netflix", cost: 15.99, renewalDate: "2025-03-01" },
  { name: "Spotify", cost: 9.99, renewalDate: "2025-03-15" },
  { name: "Gym Membership", cost: 45.00, renewalDate: "2025-03-10" },
];

export default function Dashboard() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(initialSubscriptions);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Form setup
  const form = useForm<Subscription>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      name: "",
      cost: 0,
      renewalDate: "",
    },
  });

  // Handle form submission
  const onSubmit = (data: Subscription) => {
    setSubscriptions([...subscriptions, data]);
    setIsDialogOpen(false);
    form.reset();
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Subscription Tracker</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="default">Add Subscription</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Subscription</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Netflix" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cost"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cost ($)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="e.g., 9.99"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="renewalDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Renewal Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Add</Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Cost ($)</TableHead>
                <TableHead>Renewal Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((sub, index) => (
                <TableRow key={index}>
                  <TableCell>{sub.name}</TableCell>
                  <TableCell>{sub.cost.toFixed(2)}</TableCell>
                  <TableCell>{sub.renewalDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {subscriptions.length === 0 && (
            <p className="text-center text-gray-500 mt-4">No subscriptions added yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}