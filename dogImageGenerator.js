const axios = require('axios');
const chai = require('chai');
const expectedBreedCount = require('./expectedBreedCount.json');

//Count all sub breeds for a breed. If no subbreeds, should read 0
async function getBreedCount() {
    const response = await axios.get('https://dog.ceo/api/breeds/list/all');
      //initializes count to be empty
      var count = {};
      var allBreeds = response.data.message;
      //must index through breeds of dogs listed as value of message
        for (var breed in allBreeds){
          //update count with length of array associated with the breed
          count[breed] = allBreeds[breed].length;
        }
    //returns number of subBreeds for each Breed (count of the array above)
    return count;
}


// Get a picture of sub-breed. Ex: 'basset'
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

// NO NEED TO MODIFY ANY LINES BELOW THIS POINT
// --------------------------------------------------------------------------
async function execute() {
    let breedCount = await getBreedCount();
    let image = await getRandomImageOfSubBreed('basset');
    console.log(breedCount);
    console.log(image);

    try {
        chai.expect(breedCount).to.deep.eq(expectedBreedCount);
        chai.expect(image).to.contain('https://images.dog.ceo/breeds/hound-basset/');
        console.log('PASSED: 👍');
    } catch (e) {
        console.log('FIX ME: 👎');
    }

}
execute();
