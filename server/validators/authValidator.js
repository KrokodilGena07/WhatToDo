import {body} from "express-validator";

export const authValidator = [
    body('username', 'username is incorrect').isLength({min: 1, max: 100}),
    body('email', 'email is incorrect').isEmail(),
    body('password', 'password is incorrect').isLength({min: 5, max: 15}),
];