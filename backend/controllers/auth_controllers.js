const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { findOne } = require('../model/user_model');

const User = require('../model/user_model');

exports.saveUser = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    findOne({ email: email })
        .then(user => {
            if (user) {
                return res.status(400).json({ message: 'user found' })
            }
            return bcrypt.hash(password, 12)
        })
        .then(hashedPassword => {
            const user = new User({
                name: name,
                email: email,
                password: hashedPassword
            })
            return user.save()
        })
        .then(user => {
            const token = jwt.sign({
                id: user._id
            }, 'secret')
            res.status(201).json({ token: token });
        })
        .catch(err => {
            console.log(err);
        })
}

exports.loginUser = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let logedUser;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'user not found' })
            }
            logedUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then(isEqual => {
            if (!isEqual) {
                return res.status(401).json({ message: 'password or username incorrect' });
            }
            console.log(logedUser._id);
            const token = jwt.sign({
                id: logedUser._id
            }, 'secret');
            res.status(200).json({ token: token })
        })
}