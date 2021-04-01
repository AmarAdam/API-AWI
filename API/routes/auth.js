const express = require('express');
const User = require('../models/User');
const {registerValidation, loginValidation} = require('../validation'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv/config');

const router = express.Router();

router.post('/register', async (req, res) => {    // post a user 
    console.log('on est dans la route')

    //Let's validate data
    const {error} = registerValidation(req.body);

    if(error) return res.status(400).send(error.details[0].message);   // we take in the erreur object only the message

    //Checking if the user is already in the DB
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    
    //Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        access : req.body.access
    });    
    try{
        const savedUser = await user.save();
        console.log('alors : '+user)
        res.send({user: user});
    }catch(err){
        res.status(400).send(err);
    }
});

//Login
router.post('/login', async (req,res) => {
    //Let's validate the data before we login
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Checking if the user is already in the DB
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email doesn\'t exists');

    //Checking if the password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password');

    //Now, we have to handle the session's user, with a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token)
});

module.exports = router;