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
import SubTable from "@/components/SubTable";
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
import { Trash2, Edit, TrendingUp } from "lucide-react";
import BarChartComponent from "@/components/BarChart";
import { Progress } from "@/components/ui/progress";
import { subscriptionSchema } from "@/lib/utils";

type Subscription = z.infer<typeof subscriptionSchema>;


export default function Dashboard() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null);

  // Form setup
  const form = useForm<Subscription>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      name: "",
      price: 0,
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
  const totalMonthlyCost = subscriptions.reduce((total, sub) => total + sub.price, 0);

  // Calculate average monthly cost
  const averageMonthlyCost = totalMonthlyCost / subscriptions.length || 0;

  // Prepare data for the bar chart
  const chartData = subscriptions.map((sub) => ({
    name: sub.name,
    price: sub.price,
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
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price ($)</FormLabel>
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
          <BarChartComponent chartData={chartData} />

          {/* Subscription Table */}
          <SubTable
            subscriptions={subscriptions}
            calculateDaysLeft={calculateDaysLeft}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
          {
            subscriptions.length === 0 && (
              <p className="text-center text-gray-500 mt-4">No subscriptions added yet.</p>
            )
          }
        </CardContent>
      </Card>
    </div>
  );
}