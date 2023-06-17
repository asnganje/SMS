const User = require('../models').User;
const bcrypt = require('bcrypt')
exports.login = async (req, res) => {
    const {email, password} = req.body;

    try{
        // find user with this email

        const user = await User.findOne({
            where: {
                email
            }
        })
        // check if user found
        if(!user) return res.status(404).json({message: "Sorry, user has not been found"})

       
        // check if password provided matches
        if(!bcrypt.compareSync(password, user.password)) return res.status(401).json({message: "Wrong password submitted"})


        // generate auth token
        return res.send(user)
    }

    catch(e) {
        return res.status(500).json({message: e.message})        
    }

    return res.send([email, password])

}

exports.register = async (req,res) => {
    try{
        const user = await User.create(req.body)
        return res.send(user)

    }  
    catch(e) {
        return res.status(500).json({message: e.message})
    }
}