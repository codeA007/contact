
const Contacts = require('../model/contact_model');

exports.getContacts = (req, res, next) => {
    Contacts.find({ user: req.userId }).sort({ data: -1 })
        .then(contacts => {
            res.status(200).json(contacts);
        })
        .catch(err => {
            console.log(err);
        })
}

exports.createContact = (req, res, next) => {
    const { name, email, phone, type } = req.body;
    console.log(req.userId);
    let contact = new Contacts({
        user: req.userId,
        name: name,
        email: email,
        phone: phone,
        type: type
    })
    contact.save()
        .then(contact => {
            res.status(201).json({ message: 'contact created', contact: contact })
        })
        .catch(err => {
            console.log(err);
        })
}