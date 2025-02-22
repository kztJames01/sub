import { createRequire } from "module";
import dayjs from "dayjs";
import subscriptionModel from "../models/sub.models.js";

const require = createRequire(import.meta.url);

const { serve } = require("@upstash/workflow/express");

const Reminders = [1,3,5];

export const sendReminder = serve( (async context=> {

    const { subscriptionId } = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionId);

    if(!subscription || subscription.status === 'cancelled') return;

    const renewalDate = dayjs(subscription.renewalDate);
    if(renewalDate.isBefore(dayjs())) {
        console.log(`Renewal date has passed for subscription ${subscription.name}. Stopped workflow.`);
        return;
    }

    for (const reminder of Reminders) {
        const reminderDate = renewalDate.subtract(reminder, 'days');
        if(reminderDate.isAfter(dayjs())) {
            await sleepUntilReminder(context, `reminder-${subscriptionId}-${reminder}`, reminderDate);
        }
        if(dayjs().isSame(reminderDate, "day")) {
            await triggerReminder(context, `reminder-${subscriptionId}-${reminder}`, reminderDate);
        }
    }
}));


const fetchSubscription = async (context, subscriptionId) => {
    try{
        const subscription = await context.run('get Subscription',()=>{
            return subscriptionModel.findById(subscriptionId).populate('user', 'name email');
        });
        return subscription;
    }catch(error){
        console.error(error);
    }
}

const sleepUntilReminder = async (context, label,reminderDate) => {
    console.log(`Sleeping until ${reminderDate} for ${label}`);
    await context.sleepUntil(label, reminderDate.toDate());
}

const triggerReminder = async (context, label,reminderDate) => {
    return await context.run(label, async () => {
        console.log(`Triggering reminder for ${label} at ${reminderDate}`);
        return;
    })
}