import mongoose, { Types } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minLength: [6,'Email should be at least 6 characters long'],
        maxLength: [50,'Email must not be longer than 50 characters ']
    },
    password:{
        type: String,
        select: false
    }
});

userSchema.static.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

userSchema.methods.isValidPassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateJwt = function(){
    return jwt.sign({email: this.email}, process.env.JWT_SERECT);
}

const User = mongoose.model('user',userSchema);

export default User;