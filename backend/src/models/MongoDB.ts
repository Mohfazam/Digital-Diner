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
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fdribbble.com%2Fshots%2F4187820-404-Food-Not-Found&psig=AOvVaw3oXqAA8RhXZ0Nfx6fTNQqc&ust=1746026630776000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLDa_J_G_YwDFQAAAAAdAAAAABAE"
    }
});

export const MenuItem = mongoose.model('MenuItem', menuItemsSchema);