// Creating a schema so that mongoose(ODM) can use it to populate data in the collection
const mongoose = require('mongoose');

// Defining the schema
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
});

// Assigning the schema to a collection
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;


