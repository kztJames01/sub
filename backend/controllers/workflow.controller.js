import { createRequire } from "module";
import dayjs from "dayjs";
import subscriptionModel from "../models/sub.models.js";
import { sendReminderEmail } from "../utils/sendEmail.js";

const require = createRequire(import.meta.url);

const { serve } = require("@upstash/workflow/express");

const Reminders = [7,3, 1];

export const sendReminder = serve(async (context) => {

    if (!context.requestPayload || !context.requestPayload.subscriptionId) {
        throw new Error("Missing or invalid subscriptionId");
    }
    const { subscriptionId } = context.requestPayload;
  
    const subscription = await fetchSubscription(context, subscriptionId);

    if (!subscription || subscription.status === 'cancelled') return;

    const renewalDate = dayjs(subscription.renewalDate);

    if (renewalDate.isBefore(dayjs())) {
        console.log(`Renewal date has passed for subscription ${subscription.name}. Stopped workflow.`);
        return;
    }

    for (const reminder of Reminders) {
        const maxDelaySeconds = 1_000_000; // QStash limit
        const reminderDate = renewalDate.subtract(reminder, 'days');
        const delaySeconds = reminderDate.diff(dayjs(), 'second');
        if (reminderDate.isAfter(dayjs()) && delaySeconds <= maxDelaySeconds) {
            await sleepUntilReminder(context, `${reminder} days before renewal`, reminderDate);
        }
        if (dayjs().isSame(reminderDate, "day")) {
            await triggerReminder(context, reminder, subscription);
        }
    }
});


const fetchSubscription = async (context, subscriptionId) => {

    return await context.run('get Subscription', async () => {
        return subscriptionModel.findById(subscriptionId).populate('user', 'name email');
    });

}

const sleepUntilReminder = async (context, label, reminderDate) => {
    await context.sleepUntil(label, reminderDate.toDate());
}

const triggerReminder = async (context, reminder, subscription) => {
    return await context.run(reminder, async () => {
        await sendReminderEmail({
            type: `${reminder} days before renewal`,
            subscription
          })
    })
}