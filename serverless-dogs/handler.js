'use strict';
//const dog = require("'./dogImageGenerator.js'")
//const dictionary = require("./dictionary")
module.exports.execute = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify('https://images.dog.ceo/breeds/hound-basset/'),
  };
callback(null, response);
};
