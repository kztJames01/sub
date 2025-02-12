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
        enum: ['sports', 'news', 'entertainment']
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
                const today = new Date();
                return value.getTime() > today.getTime();
            },
            message: 'Renewal Date must be in the future'
        }
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    }
}, { timestamps: true }
);
const SubModel = mongoose.model('Sub', subSchema);
export default SubModel;