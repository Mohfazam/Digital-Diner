import mongoose from "mongoose";

const menuItemsSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    category: {
        type: String,
        required: true,
        enum: ['Appetizers', 'Main Courses', 'Desserts', 'Drinks']
    },
    price: {  
        type: Number,
        required: true
    },
    description: {  
        type: String,
        default: "Delicious item description coming soon"
    },
    image: {
        type: String,
        required: true,
        default: "https://via.placeholder.com/300x200.png?text=Food+Image"
    }
});

export const MenuItem = mongoose.model('MenuItem', menuItemsSchema);