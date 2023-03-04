const mongoose=require('mongoose');

const userSchema=mongoose.Schema(
    {
        name:{
              type:String,
              required:true,
        },
        emailId:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true,
        },
        shippingAddress:{
            type:String,
            required:true,
        },
        profilePhoto:{
            type:String
        },
        favourites:[{type:mongoose.Schema.Types.ObjectId , ref:'productSchema'}],
        cartItems:[{type:mongoose.Schema.Types.ObjectId , ref:'productSchema'}],
        orderHistory:[{type:mongoose.Schema.Types.ObjectId , ref:'orderSchema'}],
        paymentCards:[{type:mongoose.Schema.Types.ObjectId , ref:'paymentCardSchema'}],
    }
);