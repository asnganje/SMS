const User = require('../models').User;
const Parent = require('../models').Parent;

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

// register user
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

// prepare and load users 

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


// add parent to database

exports.parent = async (req, res) => {
    try {
        // console.log(req.body)
        const { firstName, lastName, email, contact, relationship } = req.body.parent
        
        const parent = await Parent.create({
            firstName,
            lastName,
            email,
            contact,
            relationship
        })
        return res.send(parent)
    } 
    
    catch (e) {
        return res.status(500).json({message: e.message})       
    }
}

// load parents
exports.loader1 = async (req,res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * from "Parents"')
        const parents = result.rows
        client.release()
        res.json(parents)
        
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}