const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth_routes')
const contactRoutes = require('./routes/contact_routes');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(bodyParser.json());

// routes 
app.use('/user', authRoutes);
app.use(contactRoutes);

mongoose.connect('mongodb+srv://abhishek:9845102789@cluster0.6ck3j.mongodb.net/contact-kepper?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        // console.log(result);
        app.listen(8080)
    })
    .catch(err => {
        console.log(err);
    })