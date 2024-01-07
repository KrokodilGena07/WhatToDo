import {body, query} from "express-validator";

export const clubValidator = [
    body('title', 'title is incorrect').isLength({min: 1, max: 100}),
    body('description', 'description is incorrect').isLength({min: 1, max: 1000}),
    body('source', 'source cannot be empty').notEmpty(),
    body('phone', 'phone is incorrect').isMobilePhone('ru-RU'),
    body('ownerId', 'ownerId cannot be empty').notEmpty(),
    body('connect', 'connect type cannot be empty').notEmpty(),
    body('city', 'city cannot be empty').notEmpty(),
    body('category', 'category cannot be empty').notEmpty(),
    body('price', 'price is incorrect').isNumeric(),
];

export const clubsValidator = [
    query('connect', 'connect type cannot be empty').notEmpty(),
    query('city', 'city cannot be empty').notEmpty(),
    query('category', 'category cannot be empty').notEmpty()
];