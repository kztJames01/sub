'use client';

import React, { useState } from "react";
import SubTable from "@/components/SubTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import BarChartComponent from "@/components/BarChart";
import { subscriptionSchema } from "@/lib/utils";
import Addition from "@/components/Addition";
import { createSubscription } from "@/lib/subAPI";



export default function Dashboard() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null);
  const [loading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof subscriptionSchema>>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      id: "",
      name: "",
      price: 0,
      currency: "USD",
      frequency: "monthly",
      category: "entertainment",
      paymentMethod: "credit-card",
      status: "active",
      renewalDate: "",
      startDate: new Date().toISOString().split("T")[0],
    },
  });

  const onSubmit = async (data: z.infer<typeof subscriptionSchema>) => {
    console.log("onSubmit triggered");
    const isValid = await form.trigger();
  if (!isValid) {
    console.log("Form validation errors:", form.formState.errors);
    return;
  }
    setIsLoading(true);
    try {
      if (editingSubscription) {
        const updatedSubscriptions = subscriptions.map((sub) =>
          sub === editingSubscription ? data : sub
        );
        setSubscriptions(updatedSubscriptions);
        setEditingSubscription(null);
      } else {
        const newSub = {
          ...data,
          id: `${data.name}-${data.startDate.toString()}`,
          status: "active",
        };
        const startDate = new Date(data.startDate);
        let renewalDate = new Date(startDate);
  
        if (data.frequency === "monthly") {
          renewalDate.setMonth(startDate.getMonth() + 1);
        } else if (data.frequency === "yearly") {
          renewalDate.setFullYear(startDate.getFullYear() + 1);
        }
  
        newSub.renewalDate = renewalDate.toISOString().split("T")[0];
        const newSubscription = await createSubscription(newSub);
        setSubscriptions([...subscriptions, newSubscription.data]);
        setIsDialogOpen(false);
        form.reset();
        toast.success("Subscription added successfully");
      }
    } catch (error) {
      console.error("Error creating subscription:", error);
      toast.error("Failed to add subscription");
    } finally {
      setIsLoading(false);
    }
  };


  const handleEdit = (subscription: Subscription) => {
    setEditingSubscription(subscription);
    form.reset(subscription);
    setIsDialogOpen(true);
  };

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
    <div className="min-h-screen p-8 ">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Subscription Tracker</CardTitle>
          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold">
              Total Monthly Cost: ${totalMonthlyCost.toFixed(2)}
            </span>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="form-btn" onClick={() => setIsDialogOpen(true)}>Add Subscription</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingSubscription ? "Edit Subscription" : "Add New Subscription"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingSubscription ? "Edit the details of the subscription" : "Add a new subscription"}
                  </DialogDescription>
                </DialogHeader>

                <Addition onSubmit={onSubmit} form={form} loading={loading}/>
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

function uuidv4() {
  throw new Error("Function not implemented.");
}
