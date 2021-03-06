'use strict';

const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const fromNumber = process.env.fromNumber;
const countryCode = '+64';
const twilioClient = require('twilio')(accountSid, authToken);

module.exports.main = function(event, context, callback) {
    //get post data
    var postdata = (typeof event.body == "string" ? JSON.parse(event.body) : event);
    console.log(postdata);
    var msgbody = postdata.message;
    var numbers = postdata.numbers.split(',');
    var tidynumbers = [];

    //tidy up numbers
    for (var i in numbers) {
        var number = numbers[i].replace(/\s/g, '').replace(/\-/g, '');
        if (number.length>0){
            //tidy up number with country code
            if (number.indexOf('0')==0)
                number = countryCode+number.substring(1);
            //check if number has valid country code
            if (number.indexOf(countryCode)==0 && !tidynumbers.includes(number))
                tidynumbers.push(number);
        }
    }
    console.log(tidynumbers);

    //initialise response
    var response = {
        statusCode: null,
        headers: {
            "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
        },
        body: null
    };

    //queue all messages and send
    Promise.all(
        tidynumbers.map(function(number) {
            return twilioClient.messages.create({
                to: number,
                from: fromNumber,
                body: msgbody
            });
        })
    )
    .then(function(messages) {
        console.log('Messages all queued');

        //initialise response
        response.statusCode = 200;
        response.body = JSON.stringify({message:'successfully queued ' + messages.length + ' message'});
        callback(null, response);
    })
    .catch(function(err) { 
        console.error(err);

        //initialise response
        response.statusCode = 400;
        response.body = JSON.stringify({message:'error sending messages'});
        callback(null, response);
    });
};
