'use strict';

const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const cheerio = require('cheerio');
const request = require('request');

exports.scrape = functions.https.onRequest((req, res) => {

	if(req.method === 'PUT') {
		res.status(403).send('Forbidden!');
	}

    var url = 'http://www.google.com/';

	cors(request, res, () => {
	    request(url, function(error, response, html){

	    	if(error){
	    		res.status(200).send("ERROR", error);
	    	}

	        if(!error){
				cors(req, res, () => {
					res.status(200).send("got");
				});
	        }
	    });
	});

});