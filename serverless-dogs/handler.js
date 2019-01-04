'use strict';
const axios = require('axios');
//const dog = require( "./dogImageGenerator.js" )

module.exports.execute = async (event, context, callback) => {
  //I can use this to test locally using --data with subbreed of choice but
  //I can not get it to deploy
  let image = await getRandomImageOfSubBreed(event.subbreed);
  const response = {
    statusCode: 200,
    // I want it to print the ouptut of getRandomImageOfSubBreed
    body: console.log(image),
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
