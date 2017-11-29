/*
 This code does not run in the client browser.
 This is an example of a node script that can be run on a server
 or simply via a command line when developing.
*/
const http = require('http');

http.get('http://addb.absolutdrinks.com/ingredients/?apiKey=c67719d1c318404bbf285837cab887b4', response => {
  let data = '';

  // A chunk of data has been recieved.
  response.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  response.on('end', () => {
    const result = JSON.parse(data);
    console.log(result); // Log the whole object
    console.log('Total number of drinks:', result.totalResult); // Or log a property in the object
  });
})
