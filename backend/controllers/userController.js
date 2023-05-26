import User from '../models/User.js'

const createUser =  async (req, res) => {       

    const {email} = req.body;

    const alreadyCreated = await User.findOne({email});

    if(alreadyCreated) {
        return res.status(400).json({message: 'User already exists!'})
    }
    
   try {
        const user = new User(req.body);
        await user.save();

        res.json({message: 'Successfully added!'})
       
   } catch (error) {
        res.json({error})
   }
};

export {
  
    createUser
}