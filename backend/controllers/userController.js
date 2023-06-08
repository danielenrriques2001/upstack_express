import User from '../models/User.js'
import {generateID} from '../helpers/generateID.js'
import { generateJWT } from '../helpers/generateJWT.js'
import { emailSignUp } from '../helpers/email.js';

const createUser =  async (req, res) => {       

    const {email} = req.body;

    const alreadyCreated = await User.findOne({email});

    const token = generateID();

    if(alreadyCreated) {
        return res.status(400).json({message: 'User already exists!'})
    }
    
   try {
        const user = new User(req.body);
        user.token = generateID();
        await user.save();

        //send email of confirm
        emailSignUp({
            email: user.email,
            name: user.name,
            token: user.token,
        })

        res.json({message: 'Successfully added!'})
       
   } catch (error) {
        res.json({error})
   }
};

const authenticate = async (req, res) => {
    const {email, password } = req.body;
    //Check if the user exists

    const user = await User.findOne({email});
    
    if(!user) {
        const error = new Error("User does not exist");
        return res.status(404).json({message: error.message})
    }
   

    //Check if the user is confirmed
    if(!user.confirmed) {
        const error = new Error("Your Account is not Valid!");
        return res.status(403).json({message: error.message})
    }


    //check the password
    if(await user.checkPassword(password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateJWT(user._id),
        });
    } else {
       const error = new Error('It is not correct!');

       return res.status(403).json({message: error.message})
    }
};

const confirmUser = async (req, res) => {
    const {token} = req.params;

    const userConfirm = await User.findOne({token});

    if(!userConfirm) {
        const error = new Error("Token not valid");
        return res.status(403).json(
           { message: error.message}
        )
    }

    try {
        userConfirm.confirmed = true;
        userConfirm.token = '';
        await userConfirm.save();
        
        res.json({
            message: "User has been Confirmed!"
        })
    } catch (error) {
        console.log(error)
    }

}

const recoverPassword = async (req, res) => {

    const {email} = req.body;

   
    const alreadyCreated = await User.findOne({email});


    if(!alreadyCreated) {
        return res.status(404).json({message: 'User does not exits!'})
    }

    try {

        User.token = generateJWT();
        return res.status(200).json({message: 'A recovery email has been sent'})
        
    }  catch (error) {
        return res.status(400).json({message: error.message})
        
    }





}

const validateToken = async (req, res) => {

    const {token} = req.params;

    const user = await User.findOne({token});

    if(user) {

        user.password = password;

        user.token = '';

        try {
            await user.save();

            return res.status(400).json({message: 'Password has been modified correctly!'});

        } catch (error) {
            console.log(error)
        }

        
    } else {

        const error = new Error("Token not valid");
        return res.status(403).json(
           { message: error.message}
        )
    }






}

const createNewPassword = async (req, res) => {

    const {token} = req.params;
    const {password} = req.body;
    

    const validToken = await User.findOne({token});

    if(validToken) {

        return res.status(400).json({message: 'User already exists!'})
        
    } else {

        const error = new Error("Token not valid");
        return res.status(403).json(
           { message: error.message}
        )
    }






}

const profile =(req, res) => {
    const {user} = req.body;

    res.json(user);
}

export {
    createUser,
    authenticate,
    confirmUser,
    recoverPassword,
    validateToken,
    createNewPassword,
    profile
}