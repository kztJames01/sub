import { createRequire } from "module";
import dayjs from "dayjs";
import subscriptionModel from "../models/sub.models.js";

const require = createRequire(import.meta.url);

const { serve } = require("@upstash/workflow/express");

const Reminders = [7, 5,3, 1];

export const sendReminder = serve(async (context) => {

    if (!context.requestPayload || !context.requestPayload.subscriptionId) {
        throw new Error("Missing or invalid subscriptionId");
    }
    const { subscriptionId } = context.requestPayload;
    console.log("Received payload:", context.requestPayload);
    const subscription = await fetchSubscription(context, subscriptionId);

    if (!subscription || subscription.status === 'cancelled') return;

    const renewalDate = dayjs(subscription.renewalDate);
    console.log("Renewal date:", subscription.renewalDate);
    if (renewalDate.isBefore(dayjs())) {
        console.log(`Renewal date has passed for subscription ${subscription.name}. Stopped workflow.`);
        return;
    }

    for (const reminder of Reminders) {
        const maxDelaySeconds = 1_000_000; // QStash limit
        const reminderDate = renewalDate.subtract(reminder, 'days');
        const delaySeconds = reminderDate.diff(dayjs(), 'second');
        if (reminderDate.isAfter(dayjs()) && delaySeconds <= maxDelaySeconds) {
            await sleepUntilReminder(context, `reminder-${subscriptionId}-${reminder}`, reminderDate);
        }
        if (dayjs().isSame(reminderDate, "day")) {
            await triggerReminder(context, `reminder-${subscriptionId}-${reminder}`, reminderDate);
        }
    }
});


const fetchSubscription = async (context, subscriptionId) => {

    return await context.run('get Subscription', async () => {
        console.log("Fetched subscription:", subscriptionId);
        return subscriptionModel.findById(subscriptionId).populate('user', 'name email');
    });

}

const sleepUntilReminder = async (context, label, reminderDate) => {
    console.log(`Sleeping until ${reminderDate} for ${label}`);
    await context.sleepUntil(label, reminderDate.toDate());
}

const triggerReminder = async (context, label, reminderDate) => {
    return await context.run(label, async () => {
        console.log(`Triggering reminder for ${label} at ${reminderDate}`);
        await sendReminderEmail({
            to: subscription.user.email,
            type: label,
            subscription,
          })
    })
}