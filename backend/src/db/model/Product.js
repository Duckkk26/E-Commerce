    import mongoose, { Schema } from "mongoose";

    // Schema for creating products
    const ProductSchema = new Schema({
        id: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        images: {
            type: Array,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        brand: {
            type: String,
        },
        new_price: {
            type: Number,
            required: true
        },
        old_price: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        label: {
            type: String
        },
        quantity: {
            type: Number,
            default: 0
        },
        sold: {
            type: Number,
            default: 0
        },
        date: {
            type: Date,
            default: Date.now
        }
    });

    const ProductModel = mongoose.model("Product", ProductSchema);

    export default ProductModel;