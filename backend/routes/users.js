
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');



const jwt = require('jsonwebtoken');



function verifyToken(req, res, next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorised request');
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null'){
        return res.status(401).send('Unauthorised request');
    }

    let payload = jwt.verify(token, 'SecretKey');
    if(!payload){
        return res.status(401).send('Unauthorised request');
    }

    req.user = payload;

    next();
}

function checkIfAdmin(req, res, next){
    if(req.user.role != "admin"){
        return res.status(200).json({message: "only for admin user"})
    }
   return next()
}


router.post('/register', async (req, res)=>{

    let userData = req.body;
    
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt)

    let user = new User(userData);

    await user.save((err, registeredUser)=>{
        if(err){
            console.log('Error - ' + err)
        }
        else{
            let payload = { subject : registeredUser._id, role: registeredUser.role}
            let token = jwt.sign(payload, 'SecretKey')

            res.status(200).send({token});
        }
    })
    // res.status(200).json({
    //     message: "Succesfully registered"
    // })

})

router.post('/login', async (req, res)=>{
    
    let userData = req.body;

//     let user = await User.findOne({email : userData.email});
//     if(user){
//       const auth =  await bcrypt.compare(userData.password, user.password);
    
//     if(auth){
//         return user;
//     }
//     throw Error('incorrect password');
// }
//     throw Error('incorrect email');
    


    // let user = User.findOne({ email: userData.email}, (err,  user)=>{
        // if(err){
        //     console.log(err)
        // }
        // else{
            

        //     if(!user){
        //         res.status(401).send('invalid email')
        //     }
        //     else if(user.password !== userData.password){
        //         res.status(401).send('invalid password')
        //     }
        //     else{
        //         let payload = { subject: user._id, role: user.role}
        //         let token = jwt.sign(payload, 'SecretKey')
        //         res.status(200).send({token})
        //     } 
        // }
    // })


     let user = User.findOne({ email: userData.email}, async (err,  user)=>{
        if(err){
            console.log(err)
        }
        else{
            

            if(!user){
                res.status(401).send('invalid email')
            }
            else if(user){
                const auth = await bcrypt.compare(userData.password, user.password);
            
            if(auth){
                let payload = { subject: user._id, role: user.role}
                let token = jwt.sign(payload, 'SecretKey')
                res.status(200).send({token})
            } 


        }

        }
    })
})

router.get('/posts', verifyToken, (req, res)=>{

    let posts = [
        {
            "_id": "1",
            "title": "a",
            "description": "abc"
        },
        {
            "_id": "2",
            "title": "ab",
            "description": "abcd"
        },
        {
            "_id": "3",
            "title": "abc",
            "description": "abcde"
        },
        {
            "_id": "4",
            "title": "abcd",
            "description": "abcdef"
        }
    ]

    res.json(posts)

})

router.get('/users', verifyToken, checkIfAdmin, async (req, res)=>{
    const users = await User.find();
    res.json(
        users
    )

})




module.exports = router;