import mongoose, { Schema } from 'mongoose';

// Schema for creating cart
var CartSchema = new Schema({
  user_id: {
    type: String,
    required: true,
    unique: true
  },
  cart_data: {
    type: [{
      productId: {
        type: Number
      },
      color: {
        type: String
      },
      image: {
        type: String
      },
      price: {
        type: Number
      },
      quantity: {
        type: Number
      }
    }],
    required: true
  }
});
var CartModel = mongoose.model("Cart", CartSchema);
export default CartModel;