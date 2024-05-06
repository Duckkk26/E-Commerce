import mongoose from "mongoose";

const uri = 'mongodb+srv://trongduc2003ht:4BPPwb6uhL2lrxG5@cluster0.vric93h.mongodb.net/e-commerce';

// Database Connection with MongoDB
const connection = mongoose.connect(uri)
.then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

export default connection;