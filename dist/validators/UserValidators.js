"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const User_1 = require("../models/User");
class UserValidators {
    static signUp() {
        return [express_validator_1.body('email', 'Email is Required').isEmail().custom((email, { req }) => {
                return User_1.default.findOne({ email: email }).then(user => {
                    if (user) {
                        throw new Error('User Already Exist');
                    }
                    else {
                        return true;
                    }
                });
            }),
            express_validator_1.body('password', 'Password is Required').isAlphanumeric()
                .isLength({ min: 8, max: 20 }).withMessage('Password can be from 8-20 Characters only'),
            express_validator_1.body('username', 'Username is Required').isString()];
    }
    static verifyUser() {
        return [express_validator_1.body('verification_token', 'Verification Token is Required').isNumeric()];
    }
    static updatePassword() {
        return [express_validator_1.body('password', 'Password is Required').isAlphanumeric(),
            express_validator_1.body('confirm_password', 'Confirm Password is Required').isAlphanumeric(),
            express_validator_1.body('new_password', 'New Password is Required').isAlphanumeric()
                .custom((newPassword, { req }) => {
                if (newPassword === req.body.confirm_password) {
                    return true;
                }
                else {
                    req.errorStatus = 422;
                    throw new Error('Password and Confirm Password Does Not Match');
                }
            })];
    }
    static resetPassword() {
        return [express_validator_1.body('email', 'Email is Required').isEmail().custom((email, { req }) => {
                return User_1.default.findOne({ email: email }).then(user => {
                    if (user) {
                        req.user = user;
                        return true;
                    }
                    else {
                        throw new Error('User Does Not Exist');
                    }
                });
            }), express_validator_1.body('new_password', 'New Password is Required').isAlphanumeric().custom((newPassword, { req }) => {
                if (newPassword === req.body.confirm_password) {
                    return true;
                }
                else {
                    throw new Error('Confirm Password and new Password Does not Match');
                }
            }),
            express_validator_1.body('confirm_password', 'Confirm Password is Required').isAlphanumeric(),
            express_validator_1.body('reset_password_token', 'Reset Password Token').isNumeric()
                .custom((token, { req }) => {
                if (Number(req.user.reset_password_token) === Number(token)) {
                    return true;
                }
                else {
                    req.errorStatus = 422;
                    throw new Error('Reset Password Token is Invalid.Please Try Again');
                }
            })];
    }
    static login() {
        return [express_validator_1.query('email', 'Email is Required').isEmail()
                .custom((email, { req }) => {
                return User_1.default.findOne({ email: email }).then(user => {
                    if (user) {
                        req.user = user;
                        return true;
                    }
                    else {
                        throw new Error('User Does Not Exist');
                    }
                });
            }), express_validator_1.query('password', 'Password is Required').isAlphanumeric()];
    }
    static sendResetPasswordEmail() {
        return [express_validator_1.query('email', 'Email is Required').isEmail()
                .custom((email) => {
                return User_1.default.findOne({ email: email }).then((user) => {
                    if (user) {
                        return true;
                    }
                    else {
                        throw new Error('Email Does not Exist');
                    }
                });
            })];
    }
    static verifyResetPasswordToken() {
        return [express_validator_1.query('reset_password_token', 'Reset Password Token is Required')
                .isNumeric().custom((token, { req }) => {
                return User_1.default.findOne({
                    reset_password_token: token,
                    reset_password_token_time: { $gt: Date.now() }
                }).then((user) => {
                    if (user) {
                        return true;
                    }
                    else {
                        throw new Error('Token Doest Not Exist.Please Request For a New One');
                    }
                });
            })];
    }
    static updateProfilePic() {
        return [express_validator_1.body('profile_pic').custom((profilePic, { req }) => {
                if (req.file) {
                    return true;
                }
                else {
                    throw new Error('File not Uploaded');
                }
            })];
    }
}
exports.UserValidators = UserValidators;
