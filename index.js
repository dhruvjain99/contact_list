const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

var app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

var contactList = [
    {
        name: "Dhruv Jain",
        phone: "1234567891"
    },
    {
        name: "Arpan",
        phone: "1111112223"
    },
    {
        name: "Tony Stark",
        phone: "9999988888"
    },
];

app.get('/', function(req, res){
    
    // return res.render('index',{
    //     title: "My Contact List",
    //     contact_list: contactList
    // });

    Contact.find({}, function(err, contactList){
        if(err){
            console.log('Error in fetching from the database.');
            return;
        }
        console.log('Successfully fetched all the data from the database.');
        return res.render('index', {
            title: 'My Contact List',
            contact_list: contactList
        });
    });
});

app.get('/contact_added', function(req, res){
    return res.render('contact_added');
});

app.post('/create-contact', function(req, res){
    console.log(req.body);
    // contactList.push(req.body);
    // return res.redirect('back');
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){
            console.log('Error creating a contact.');
            return;
        }

        console.log('***********', newContact);
        return res.redirect('back');
    });
});

// Using string params
// app.get('/delete-contact/:phone', function(req, res){
//     console.log(req.params);
// });

app.get('/delete-contact/', function(req, res){
    //console.log(req.query);
    // var phone = req.query.phone;

    // var contactIndex = contactList.findIndex(contact => contact.phone == phone);
    // contactList.splice(contactIndex, 1);

    // return res.redirect('back');

    var id = req.query.id;

    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('Error in deleting an object from the database');
            return;
        }

        console.log('Successfully deleted an object from database');
        return res.redirect('back');
    });
});

app.listen(port, function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log("My express server is running on port :", port);
});