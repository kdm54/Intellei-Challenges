const axios = require('axios');
const chai = require('chai');
const expectedBreedCount = require('./expectedBreedCount.json');

//Count all sub breeds for a breed. If no subbreeds, should read 0
async function getBreedCount() {
    const response = await axios.get('https://dog.ceo/api/breeds/list/all');
    // if response has value for key-message (is true), then executes
    if (response.data.message){
      //initializes count to be empty
      var count = {};
      var allBreeds = response.data.message;
      //must index through breeds of dogs listed as value of message
        for (var breed in allBreeds){
          //update count with length of array associated with the breed
          count[breed] = allBreeds[breed].length;
        }
    }
    //returns number of subBreeds for each Breed
    return count;
}


// Get a picture of sub-breed. Ex: 'basset'
async function getRandomImageOfSubBreed(subBreed) {
  //starting next;
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
