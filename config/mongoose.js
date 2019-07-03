// Importing mongoose(ODM) in order to connect to the mongodb database
const mongoose = require('mongoose');

//Establishing a connection with the database in mongodb
mongoose.connect('mongodb://localhost/contact_list_db');

//Acquiring a connection to check if connection is established successfully or not
const db = mongoose.connection;

//Handle the error if connection not established
db.on('error', console.error.bind(console, 'Error connecting to the database.'));

// Print a message if connection is established
db.once('open', function(){
    console.log('Successfully connected to the database.');
});
