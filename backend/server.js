const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const { type } = require('os');
const { error } = require('console');

require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

// Database Connection with MongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

// API Creation
app.get("/", (req, res) => {
    res.send("Epress App is running")
});

// Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({storage: storage});

// Creating upload endpoint for images
app.use('/images', express.static('upload/images'));

app.post("/upload", upload.single('product'), (req, res) => {
    res.status(200).json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

// Schema for creating products
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    new_price: {
        type: Number,
        required: true
    },
    old_price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    available: {
        type: Boolean,
        default: true
    }
});

// API for adding product
app.post('/addProduct', async (req,res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let lastProductArray = products.slice(-1);
        let lastProduct = lastProductArray[0];
        id = lastProduct.id + 1;
    } else {
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price
    });
    await product.save();
    res.json({
        success: true,
        name: req.body.name
    });
});

// API for deleting Product
app.post('/removeProduct', async (req, res) => {
    await Product.findOneAndDelete({id: req.body.id});
    res.json({
        success: true,
        name: req.body.name
    });
});

// API for getting all products
app.get('/allProducts', async (req, res) => {
    let products = await Product.find({});
    res.send(products);
});

// API for new collection data
app.get('/newCollections', async (req, res) => {
    let products = await Product.find({})
    let newCollections = products.slice(1).slice(-8);
    res.send(newCollections);
});

// API for popular in women
app.get('/popularInWomen', async (req, res) => {
    let products = await Product.find({category: "women"});
    let popularProducts = products.slice(0, 4);
    res.send(popularProducts);
});

// Create schema for user model
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cartData: {
        type: Object
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Create endpoint for registering user account
app.post('/signup', async (req, res) => {
    let check = await User.findOne({email: req.body.email});
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
    
    const user= new User({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })
    await user.save();
    console
    
    const data = {
        user: {
            id: user.id
        }
    };
    const token = jwt.sign(data, 'secret_ecom');
    res.json({
        success: true,
        token
    });
});

// Creating endpoint for user login
app.post('/login', async (req, res) => {
    let user =  await User.findOne({email: req.body.email});
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            };
            const token = jwt.sign(data, 'secret_ecom');
            res.json({
                success: true,
                token
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

// Middleware to fetch user
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({errors: "Please authenticate using a valid token"});
    } else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({errors: "Please authenticate using a valid token"})
        }
    }
}

// API for adding products to cart
app.post('/addToCart', fetchUser, async (req, res) => {
    let userData = await User.findOne({_id: req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await User.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData});
    res.send("Added");
});

// API for removing product from cart
app.post('/removeFromCart', fetchUser, async (req, res) => {
    let userData = await User.findOne({_id: req.user.id});
    if (userData.cartData[req.body.itemId] > 0) {
        userData.cartData[req.body.itemId] -= 1;
    }
    await User.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData});
    res.send("Removed");
});

// API for getting cart data 
app.post('/getCart', fetchUser, async (req, res) => {
    let userData = await User.findOne({_id: req.user.id});
    res.json(userData.cartData);
});

app.listen(port, (error) => {
    if (!error) {
        console.log(`Server is running on port ${port}. http://localhost:${port}`);
    } else {
        console.log('Error' + error);
    }
});