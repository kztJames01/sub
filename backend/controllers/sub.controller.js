import  SubModel  from "../models/sub.models.js";
import { workflowClient } from "../config/upstash.js";
import { SERVER_URL } from "../config/env.js";

export const createSub = async (req, res, next) => {
    try {
        const sub = await SubModel.create({
            ...req.body,
            user: req.user._id
        });
        await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/reminder`,
            body: {
                subscriptionId: sub.id
            },
            headers: {
                'content-type': 'application/json'
            },
            retries: 0
        });
        res.status(201).json({
            success: true,
            data: {sub}
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const getUserSubs = async (req, res, next) => {
    try {
        if(req.user.id !== req.params.id){
            const error = new Error("Unauthorized. Only the owner can access this sub");
            error.status = 401;
            throw error;
        }
        const subs = await SubModel.find({user: req.params.id});
        res.status(200).json({
            success: true,
            data: subs
        });
    } catch (error) {
        next(error);
    }
}

export const updateSub = async (req, res, next) => {
    try {
        const sub = await SubModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            success: true,
            data: sub
        });
    } catch (error) {
        next(error);
    }
}

export const cancelSub = async (req, res, next) => {
    try {
        const sub = await SubModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            data: sub
        });
    } catch (error) {
        next(error);
    }
}

export const getUpcomingRenewals = async (req, res, next) => {
    try {
        const subs = await SubModel.find({status: 'active'});
        res.status(200).json({
            success: true,
            data: subs
        });
    } catch (error) {
        next(error);
    }
}

export const getExpiredSubs = async (req, res, next) => {
    try {
        const subs = await SubModel.find({status: 'expired'});
        res.status(200).json({
            success: true,
            data: subs
        });
    } catch (error) {
        next(error);
    }
}

export const getAdminSubs = async (req, res, next) => {
    try {
        if(req.user.id !== req.params.id && req.user.role !== 'admin'){
            const error = new Error("Unauthorized. Only the admin can access this list of subscriptions");
            error.status = 401;
            throw error;
        }
        const sub = await SubModel.find({status: 'active'|| 'expired'});
        res.status(200).json({
            success: true,
            data: sub
        });
    } catch (error) {
        next(error);
    }
}

export const adminDeleteSub = async (req, res, next) => {
    try {
        const sub = await SubModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            data: sub
        });
    } catch (error) {
        next(error);
    }
}