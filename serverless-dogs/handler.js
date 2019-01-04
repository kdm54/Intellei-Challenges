'use strict';
const axios = require('axios');

//only deploy when breedCount() is commented out so it does not appear on site
const dog = require( "./dogImageGenerator.js" )

//const axios = require('axios');
module.exports.execute = async (event, context, callback) => {
  //var imageURL = await getRandomImageOfSubBreed(event.a);
  const response = {
    statusCode: 200,
    body: dog(),
  };
  callback(null, response);
};




async function getRandomImageOfSubBreed(subBreed) {
  const response = await axios.get('https://dog.ceo/api/breeds/list/all');
      var dog = "";
      var allBreeds = response.data.message;
      //for each breed of dog:
      for (var breed in allBreeds){
        //if the index of that specific breed has a subBreed:
        //(it's subBreed count must be greater than 0 for it to have a subBreed)
        if (allBreeds[breed].indexOf(subBreed) >= 0){
          dog = breed;
          //got URL from the dog API random generator section
          var random = await axios.get('https://dog.ceo/api/breed/' + dog + '/' + subBreed + '/images/random');
          //returns value of random
          return random.data.message;
        }
      }
}
