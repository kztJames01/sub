import mongoose from "mongoose";

const subSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subscription Name is required'],
        trim: true,
        minlength: [3, 'Subscription Name must be at least 3 characters long'],
        maxlength: 100
    },

    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be greater than 0'],
    },

    currency: {
        type: String,
        enum: ['USD', 'EUR', 'GBP'],
        default: 'USD'
    },

    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
        default: 'monthly'
    },

    category:{
        type: String,
        enum: ['sports', 'news', 'entertainment', 'grocery', 'education', 'travel', 'health', 'business']
    },

    paymentMethod: {
        type: String,
        enum: ['credit-card', 'paypal', 'bank-transfer'],
        default: 'credit-card'
    },

    status: {
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active'
    },

    startDate: {
        type: Date,
        required: [true, 'Start Date is required'],
        validate: {
            validator: function (value) {
                const today = new Date();
                return value.getTime() <= today.getTime();
            },
            message: 'Start Date must be in the past'
        }
    },

    renewalDate: {
        type: Date,
        validate: {
            validator: function (value) {
                return value > this.startDate;
            },
            message: 'Renewal Date must be in the future'
        }
    },

    user: {
        type: mongoose.Schema.Types.ObjectId, // ID is referenced from user collection
        ref: 'User',
        required: [true, 'User is required']
    }
}, { timestamps: true }
);

// Auto-calculate renewalDate if missing
// This pre-save middleware function is used to automatically calculate the renewalDate
// of a subscription if it is not provided. The calculation is based on the startDate
// and frequency of the subscription. If the startDate is changed, the renewalDate
// is recalculated. If the renewalDate is provided, it is not changed. The renewalDate
// is always in the future relative to the startDate.
subSchema.pre('save', function (next) {
    if (this.isNew || this.isModified('startDate')) {
        this.renewalDate = new Date(this.startDate);
        switch (this.frequency) {
            case 'daily':
                this.renewalDate.setDate(this.renewalDate.getDate() + 1);
                break;
            case 'weekly':
                this.renewalDate.setDate(this.renewalDate.getDate() + 7);
                break;
            case 'monthly':
                this.renewalDate.setMonth(this.renewalDate.getMonth() + 1);
                break;
            case 'yearly':
                this.renewalDate.setFullYear(this.renewalDate.getFullYear() + 1);
                break;
            default:
                break;
        }
    }

    if(this.renewalDate < new Date()){
        this.status = 'expired';
    }
    next();
});


const SubModel = mongoose.model('Sub', subSchema);
export default SubModel;