var request = require('request');
const axios = require('axios');

const urlBeg = 'https://app.zenserp.com/api/v2/search?q=';
const urlEnd = '&tbm=isch&location=United+States&search_engine=google.com&hl=en&gl=US';

getUrl = function(term) {
    return urlBeg.concat(term.replace(' ', '+'), '+flower', urlEnd);
}

exports.getFlowerImages = async function(flowers, flowerImages) {

    return new Promise((resolve) => {

        var headers = {
            'apikey': 'eee34ba0-1d2b-11ea-b866-a30cb0d223f1'
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
                    //console.log(JSON.parse(body).image_results[0].sourceUrl);
                    flowerImages.push({
                        flower: flower,
                        imageUrl: JSON.parse(body).image_results[0].sourceUrl
                    });
                }
                else
                    flowerImages.push('/#');

                if(flowerImages.length == flowers.length)
                    resolve();
            }
    
            request(options, callback);
        }

    });
}

