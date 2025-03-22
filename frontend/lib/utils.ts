import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import qs from 'query-string'
import {z} from 'zod'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function UrlQuery({ params, key, value }: UrlQueryParams) {
    const query = qs.parse(params);
    query[key] = value;
    return qs.stringifyUrl({
        url: window.location.pathname,
        query: query,
    }, {
        skipNull: true,
        skipEmptyString: true,
    });
}
export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const authFormSchema = (type:string)=> z.object({
    firstName: type === 'sign-in'? z.string().optional(): z.string().min(2),
    lastName: type === 'sign-in'? z.string().optional(): z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: type === 'sign-in'? z.string().optional(): z.string().min(6),
})
export function encryptId(id: string) {
    return btoa(id);
}
export const formatDateTime = (dateString: Date) => {
    const dateTimeOptions: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    const dateDayOptions: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        month: 'short',
        day: '2-digit',
        year: '2-digit',
    };

    const dateOptions: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    };

    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    const formatDateTime: string = new Date(dateString).toLocaleString('en-US', dateTimeOptions);
    const formatDateDay: string = new Date(dateString).toLocaleString('en-US', dateDayOptions);
    const formatDate: string = new Date(dateString).toLocaleString('en-US', dateOptions);
    const formatTime: string = new Date(dateString).toLocaleString('en-US', timeOptions);

    return {
        dateTime: formatDateTime,
        dateDay: formatDateDay,
        date: formatDate,
        time: formatTime,
    };
};

export const subscriptionSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, "Subscription name is required"),
  price: z.number().min(0, "Price must be a positive number"),
  category: z.string().min(3, "Category is required"),
  paymentMethod: z.string().min(3, "Payment method is required"),
  status: z.string().min(3, "Status is required").optional(),
  frequency: z.string().min(3, "Frequency is required"),
  currency: z.string().min(3, "Currency is required"),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Enter a valid date (YYYY-MM-DD)"),
  renewalDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});
