import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import UserModel from '../../db/model/User.js'
import { fetchUser } from '../middleware/fetchUserFromToken.js';

const router = express.Router();

dotenv.config();
const jwt_secret = process.env.JWT_SECRET;

// API for registering user account
router.post('/signup', async (req, res) => {
    let check = await UserModel.findOne({email: req.body.email});
    if (check) {
        return res.json({
            success: false,
            errors: "Existing user found with the same email address"
        });
    }
    
    let cart = {};
    for (let i = 0; i< 300; i++) {
        cart[i] = 0;
    }
    
    const user= new UserModel({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
        admin: req.body.admin
    })
    await user.save();
    
    const data = {
        user: {
            id: user.id
        }
    };
    const token = jwt.sign(data, jwt_secret);
    res.json({
        success: true,
        token,
        admin: user.admin
    });
});

// Creating endpoint for user login
router.post('/login', async (req, res) => {
    let user =  await UserModel.findOne({email: req.body.email});
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            };
            const token = jwt.sign(data, jwt_secret);
            res.json({
                success: true,
                token,
                admin: user.admin
            })
        } else {
            res.json({
                success: false,
                errors: "Wrong Password"
            });
        }
    } else {
        res.json({
            success: false,
            errors: "Wrong Email Address"
        });
    }
});

// API for adding products to cart
router.post('/addToCart', fetchUser, async (req, res) => {
    let userData = await UserModel.findOne({_id: req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await UserModel.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData});
    res.json("Added");
});

// API for removing product from cart
router.post('/removeFromCart', fetchUser, async (req, res) => {
    let userData = await UserModel.findOne({_id: req.user.id});
    if (userData.cartData[req.body.itemId] > 0) {
        userData.cartData[req.body.itemId] -= 1;
    }
    await UserModel.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData});
    res.json("Removed");
});

// API for getting cart data 
router.post('/getCart', fetchUser, async (req, res) => {
    let userData = await UserModel.findOne({_id: req.user.id});
    res.json(userData.cartData);
});

export { router };