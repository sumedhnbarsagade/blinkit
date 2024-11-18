import UserModel from '../models/user.model.js';
import bcryptjs from 'bcryptjs'
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js';
import sendEmail from '../config/sendEmail.js';

export async function registerUserController(request, response){
    try {
        const {name, email, password } = request.body
        
        if(!name || !email || !password){
           return response.status(400).json({
            message : "Please provide email, name, password",
            error : true,
            success: false
           })
        }

        const user = await UserModel.findOne({email});

        if (user){
            return response.json({
                message : "Already registed email",
                error: true,
                success : false
            })
        }

        // save data in database
        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password, salt)

        const payload = {
            name,
            email,
            password : hashPassword
        }

        //save above data in mongodb database

        const newUser = new UserModel(payload)
        const save = await newUser.save()

        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?.id}`

        const verificationEmail = await sendEmail({
            sendTo : email,
            subject : "Verify email from blinkit",
            html : verifyEmailTemplate({
                name,
                url : verifyEmailUrl
            })
        })

        return response.json({
            message : "user created successfully",
            error : false,
            success: true,
            data: save
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })

    }
} 

export default registerUserController;