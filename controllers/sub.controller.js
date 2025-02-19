import  SubModel  from "../models/sub.models.js";


export const createSub = async (req, res, next) => {
    try {
        const sub = await SubModel.create({
            ...req.body,
            user: req.user._id
        });

        res.status(201).json({
            success: true,
            data: sub
        });
    } catch (error) {
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