import mongoose from "mongoose";

const menuItemsSchema = new mongoose.Schema({
    name: {type : String, required: true},
    category: {
        type: String,
        required: true,
        enum: ['Appetizers', 'Main Courses', 'Desserts', 'Drinks']
    }, 
    prize: {
        type: Number,
        required: true
    },
    Description: {type: String},
});

export const menuItems = mongoose.model('menuItems', menuItemsSchema);