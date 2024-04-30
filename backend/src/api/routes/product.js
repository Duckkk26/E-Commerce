import express from 'express'
import ProductModel from '../../db/model/Product.js'

const router = express.Router();

// API for adding product
router.post('/add', async (req,res) => {
    let products = await ProductModel.find({});
    let id;
    if (products.length > 0) {
        let lastProductArray = products.slice(-1);
        let lastProduct = lastProductArray[0];
        id = lastProduct.id + 1;
    } else {
        id = 1;
    }

    const product = new ProductModel({
        id: id,
        name: req.body.name,
        images: req.body.images,
        category: req.body.category,
        brand: req.body.brand,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
        description: req.body.description,
        label: req.body.label,
        quantity: req.body.quantity
    });
    await product.save();

    res.json({
        success: true,
        name: req.body.name
    });
});

// API for deleting Product
router.post('/remove', async (req, res) => {
    await ProductModel.findOneAndDelete({id: req.body.id});
    res.json({
        success: true,
        name: req.body.name
    });
});

// API for getting all products
router.get('/all', async (req, res) => {
    let products = await ProductModel.find({});
    res.send(products);
});

// API for new collection data
router.get('/new', async (req, res) => {
    let products = await ProductModel.find({label: "new"})
    let newCollections = products.slice(-10);
    res.send(newCollections);
});

// API for popular in a category
const categories = ['Mobile', 'Tablet', 'Laptop', 'PersonalComputer'];

categories.forEach((category) => {
    router.get(`/popularIn${category}`, async (req, res) => {
        let products = await ProductModel.find({category: `${category}`, label: "popular"});
        let popularProducts = products;
        res.send(popularProducts);
    });
})

export { router };