const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const authConfig = require('../../config/auth');

function generateToken(params = {}){
    
    return jwt.sign(params, authConfig.secret, {

        expiresIn: 86400,
     });
}

module.exports = {

    async register(req, res){

        const { firstName, lastName, email, password } = req.body;
        
        try{
            if(await User.findOne({ where: { email }}))
                return res.status(400).send({ error: "User already exists!" });

            const user = await User.create({ firstName, lastName, email, password });

            //retira o password do objeto parateronar o json
            user.password = undefined;
    
            return res.send({ 
                user,
                token: generateToken({ id: user.id })
            });
    
        }catch( err ){

            return res.status(400).send({ error: "Registration failed!"});
        }

    },

    async authenticate(req, res){

        const { email, password } = req.body;

        const user = await User.findOne({ where: { email }});

        if(!user)
            return res.status(400).send({error: "User not found!"});

        if(!await bcrypt.compare( password, user.password ))
            return res.status(400).send({ error: "Invalid password!"});

        user.password = undefined;

        res.send({ 
            user, 
            token: generateToken({ id: user.id })
        });
    },
};