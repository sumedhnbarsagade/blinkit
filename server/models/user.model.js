import { verify } from "jsonwebtoken";
import mongoose from "mongoose";

// creating databse table

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Provide name"]
    },

    email : {
        type: String,
        required : [true, "Please enter email"],
        unique: true
    },

    password: {
        type: String,
        required : [true, "Please enter password"]
    },

    avatar: {
        type : String,
        default : ""
    },
    mobile : {
        type : Number,
        default : null
    },
    refresh_token : {
        type : String,
        default: ""
    },
    verify_email: {
        type : Boolean,
        default: false
    },
    last_login_date : {
        type : Date,
        default : ""
    },
    status : {
        type : String,
        enum: ["Active", "Inactive", "Suspended"],
        default: "Active"
    },
    address_details : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'address'
        }
    ],
    shopping_cart : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'cartProduct'
        }
    ],
    orderHistory : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'order'
        }
    ],
    forget_password_otp : {
        type : String,
        default : null
    },

    forget_password,expiry : {
        type : Date,
        default: ""
    },
    role: {
        type : String,
        enum : ['ADMIN', 'USER'],
        default: "USER"
    },

}, {
    timestamps : true
})

const UserModel = mongoose.model("User",userSchema)

export default UserModel;