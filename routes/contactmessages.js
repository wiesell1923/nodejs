var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//database connection
var con = mysql.createConnection({

    host: "localhost",
    user: "adi",
    password: "Mypass123$",
    dateStrings: 'date',
    database: "project",
    timezone: 'utc'


});






/* GET  page. */
router.get('/', function (req, res, next) {
    //select * from contact table and send data to contactmessages.ejs file
    con.query("SELECT * FROM contact", function (err, result) {

        //get username session
        var username = req.session.username;


        if (req.session) {



            //check if logged in and username admin
            if (req.session.validated == true && username == 'admin') {

                // send variables to ejs file
                res.render('contactmessages', { messageList: result, username: username });


            } else {
                //redirect to login id not logged in and user not admin
                res.redirect('/login');
            }

        }




    });


});

//



module.exports = router;