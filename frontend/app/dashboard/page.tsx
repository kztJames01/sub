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
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
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
import { Trash2, Edit, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Progress } from "@/components/ui/progress";
import { subscriptionSchema } from "@/lib/utils";

type Subscription = z.infer<typeof subscriptionSchema>;

const initialSubscriptions: Subscription[] = [
  { name: "Netflix", price: 15.99, renewalDate: "2025-03-01" },
  { name: "Spotify", price: 9.99, renewalDate: "2025-03-15" },
  { name: "Gym Membership", price: 45.00, renewalDate: "2025-03-10" },
];

export default function Dashboard() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(initialSubscriptions);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null);

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
    if (editingSubscription) {
      // Update existing subscription
      const updatedSubscriptions = subscriptions.map((sub) =>
        sub === editingSubscription ? data : sub
      );
      setSubscriptions(updatedSubscriptions);
      setEditingSubscription(null);
    } else {
      // Add new subscription
      setSubscriptions([...subscriptions, data]);
    }
    setIsDialogOpen(false);
    form.reset();
  };

  // Handle edit action
  const handleEdit = (subscription: Subscription) => {
    setEditingSubscription(subscription);
    form.reset(subscription);
    setIsDialogOpen(true);
  };

  // Handle delete action
  const handleDelete = (subscription: Subscription) => {
    const updatedSubscriptions = subscriptions.filter((sub) => sub !== subscription);
    setSubscriptions(updatedSubscriptions);
  };

  // Calculate total monthly cost
  const totalMonthlyCost = subscriptions.reduce((total, sub) => total + sub.cost, 0);

  // Calculate average monthly cost
  const averageMonthlyCost = totalMonthlyCost / subscriptions.length || 0;

  // Prepare data for the bar chart
  const chartData = subscriptions.map((sub) => ({
    name: sub.name,
    cost: sub.cost,
    average: averageMonthlyCost,
  }));

  // Calculate days left until renewal for a subscription
  const calculateDaysLeft = (renewalDate: string) => {
    const today = new Date();
    const renewal = new Date(renewalDate);
    const timeDiff = renewal.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="min-h-screen p-8 bg-background text-foreground">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Subscription Tracker</CardTitle>
          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold">
              Total Monthly Cost: ${totalMonthlyCost.toFixed(2)}
            </span>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="default">Add Subscription</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingSubscription ? "Edit Subscription" : "Add New Subscription"}
                  </DialogTitle>
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
                    <Button type="submit">
                      {editingSubscription ? "Save Changes" : "Add Subscription"}
                    </Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Bar Chart */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Monthly Subscription Cost vs Average</CardTitle>
              <CardDescription>Comparison of individual subscription costs with the average monthly cost.</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Bar dataKey="cost" fill="hsl(var(--chart-1))" radius={4} />
                  <Bar dataKey="average" fill="hsl(var(--chart-2))" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Subscription Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Cost ($)</TableHead>
                <TableHead>Renewal Date</TableHead>
                <TableHead>Days Left</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {subscriptions.map((sub, index) => {
                const daysLeft = calculateDaysLeft(sub.renewalDate);
                const progress = ((30 - daysLeft) / 30) * 100; // Assuming 30 days as the max for the progress bar

                return (
                  <TableRow key={index}>
                    <TableCell>{sub.name}</TableCell>
                    <TableCell>{sub.cost.toFixed(2)}</TableCell>
                    <TableCell>{sub.renewalDate}</TableCell>
                    <TableCell>
                      <Progress value={progress} className="h-2 mb-1" /> {/* Use the Progress component */}
                      <span className="text-sm">{daysLeft} days left</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(sub)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(sub)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
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