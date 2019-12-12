var request = require('request');
const axios = require('axios');

const urlBeg = 'https://app.zenserp.com/api/v2/search?q=';
const urlEnd = '&tbm=isch&location=United+States&search_engine=google.com&hl=en&gl=US';

getUrl = function(term) {
    return urlBeg.concat(term.replace(' ', '+'), urlEnd);
}

exports.getFlowerImages = async function(flowers, flowerImages) {

    return new Promise((resolve) => {

        var headers = {
            'apikey': '96a25620-1c7a-11ea-803e-5d1937d6eb6d'
        };
    
        for(let i = 0; i < flowers.length; i++)
        {
            let flower = flowers[i];
    
            var options = {
                url: getUrl(flower),
                headers: headers,
                limit: 1
            };
            
            function callback(error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(JSON.parse(body).image_results[0].sourceUrl);
                    flowerImages.push(JSON.parse(body).image_results[0].sourceUrl);
                }
            }
    
            request(options, callback);
        }

        resolve();

    });
}

