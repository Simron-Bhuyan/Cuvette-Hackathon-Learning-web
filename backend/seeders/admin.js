const User = require('../models/user');

exports.seedAdmin = ()=>{
    User.findOne({role: "admin"}, (err, admin)=>{
        if(err) throw err;
        if(admin){
            return "Admin account already exists";
        }

        User.create({
            name: "Punit",
            email: "Punit@gmail.com",
            password: "Punit",
            role : "admin"
        }, (err, user)=>{
            if(err) throw err;
            // bcrypt.genSalt(10);
            // bcrypt.hash(password, salt)

            user.save((err)=>{
                if(err) throw err;
                return "Admin account created";
            })
        })
    })
}