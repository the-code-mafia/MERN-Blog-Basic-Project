const {body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET || 'secret';

// User registration validation rules
const registerValidation = [
    body('name').not().isEmpty().trim().withMessage('Name is required'),
    body('email').isEmail().trim().withMessage('Email is not valid'),
    body('password').isLength({min:6}).withMessage('Password should be minimum 6 characters'),
];

// User login validation rules
const loginValidation = [
    body('email').isEmail().trim().withMessage('Email is not valid'),
    body('password').isLength({min:6}).withMessage('Password should be minimum 6 characters'),
];

/**
 * User registration method
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns {JSON}
 */
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const checkUser = await User.findOne({email});

        if(checkUser) {
            return res.status(400).json({errors: [{msg: 'Email is already taken'}]})
        }

        const salt = await bcrypt.genSalt(10); // Salt
        const hashPassword = await bcrypt.hash(password, salt); // Generate has password

        // Insert new user
        const user = await User.create({
            name,
            email,
            password: hashPassword
        });
        
        // Create JWT token
        const token = jwt.sign({user}, jwtSecret, {
            expiresIn: '7d'
        });

        return res.status(201).json({data: user, msg: 'Your account has been created', token});
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

/**
 * User login method
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns {JSON}
 */
const login = (req, res) => {
    return res.json('login');
};

module.exports = {
    registerValidation,
    loginValidation,
    register,
    login
}