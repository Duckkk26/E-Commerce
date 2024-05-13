import express from 'express'
import dotenv from 'dotenv'

//Import model for cart
import CartModel from '../../db/model/Cart.js'

//Import middlewares
import { fetchUser } from '../middleware/fetchUserFromToken.js';

const router = express.Router();

dotenv.config();
const jwt_secret = process.env.JWT_SECRET;

// API for getting cart data 
router.post('/get', fetchUser, async (req, res) => {
    let userCart = await CartModel.findOne({user_id: req.user.id});
    res.json(userCart.cart_data);
});

// API for adding cart data to cart
router.post('/addToCart', fetchUser, async (req, res) => {
    let userCart = await CartModel.findOne({user_id: req.user.id});
    
    // Check req.body.color if it was in the cart before
    let found = false;
    let index = 0;
    userCart.cart_data.forEach((product, i) => {
        if (product && product.productId === req.body.productId && product.color === req.body.color) {
            found = true;
            index = i;
        }
    })
    if (found) {
        userCart.cart_data[index].quantity += 1;
    }
    else {
        userCart.cart_data = [
            ...userCart.cart_data,
            {
                productId: req.body.productId,
                color: req.body.color,
                image: req.body.image,
                price: req.body.price,
                quantity: 1
            }
        ]
    }

    await CartModel.findOneAndUpdate({user_id: req.user.id}, {cart_data: userCart.cart_data});
    res.json("Added");
});

// API for removing product from cart
router.post('/removeFromCart', fetchUser, async (req, res) => {
    let userCart = await CartModel.findOne({user_id: req.user.id});
    
    // Check req.body.color if it was in the cart before
    let found = false;
    let index = 0;
    userCart.cart_data.forEach((product, i) => {
        if (product && product.productId === req.body.productId && product.color === req.body.color) {
            found = true;
            index = i;
        }
    })
    if (found) {
        if (userCart.cart_data[index].quantity > 0) {
            userCart.cart_data[index].quantity -= 1;
        }
        if (userCart.cart_data[index].quantity === 0) {
            userCart.cart_data.splice(index, 1);
        }
    }

    await CartModel.findOneAndUpdate({user_id: req.user.id}, {cart_data: userCart.cart_data});
    res.json("Removed");
});

export { router };