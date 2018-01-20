'use strict';

exports.handler = function(event, context, callback) {

    const {fetchSubreddit} = require('fetch-subreddit');
    
    fetchSubreddit('nbastreams').then(data => {

        var responseBody = {
            input: event,
            nbaUrls: data[0].urls
        };
        
        var response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Credentials" : true
            },
            body: JSON.stringify(responseBody)
        };
        
        callback(null, response);
    })
    .catch(function(error){
        console.log(error);
    });
};