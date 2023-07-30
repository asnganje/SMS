const User = require('../models').User;
const bcrypt = require('bcrypt')
const { Pool } = require('pg');

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
        if(password !== user.password) {
            return res.status(401).json({message: "Wrong password submitted"})
        } 


        // return user 

        return res.send(user)
    }

    catch(e) {
        return res.status(500).json({message: e.message})        
    }

    return res.send([email, password])

}

exports.register = async (req, res) => {
    try{
    
    const avatar = req.body.avatar || 'meee'; 
    const {firstName, lastName, email, password, gender} = req.body.user


    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        gender,
        avatar
        });
        return res.send(user)
    }  
    catch(e) {
        return res.status(500).json({message: e.message})
    }
}


const pool = new Pool({
    user: 'postgres',
    database: 'school_db',
    password: 'nodimon',
    port: 5432, // Default PostgreSQL port
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 0
  });

exports.loader = async (req, res) => {
    
    try{
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM "Users"');
        const users = result.rows;
        client.release();
        res.json(users);
    }

    catch(e) {
        return res.status(500).json({message: e.message})        
    }

}
