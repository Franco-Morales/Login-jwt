import { check } from "express-validator";

import {  validate } from "./validate";
import User from "../models/user";


export const singUpVal = [
    check("email")
        .notEmpty()
        .withMessage("Email is required")
        .normalizeEmail()
        .isEmail()
        .withMessage("Invalid email format")
        .custom( async ( value ) => {
            const emailCheck = await User.findOne({ email: value });

            if( emailCheck !== null ) return Promise.reject();
        })
        .withMessage('Email is already in use'),
    check("password")
        .notEmpty()
        .withMessage("Password is required"),
    check("username")
        .notEmpty()
        .withMessage("Username is required"),
    (req, res, next) => validate(req, res, next)
];

export const loggInVal = [
    check("email")
        .exists()
        .notEmpty()
        .normalizeEmail()
        .isEmail()
        .withMessage("Invalid email format")
        .custom( async ( value ) => {
            const emailCheck = await User.findOne({ email: value });
            
            if( !emailCheck  ) return Promise.reject();
        })
        .withMessage('User does not exist'),
    check("password")
        .exists()
        .notEmpty(),
    (req, res, next) => validate(req, res, next)
];