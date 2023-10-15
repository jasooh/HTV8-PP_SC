const keys = require('./keys.json');
// initialize express
const express = require('express');
const fs = require('fs');
const app = express();
// middle-ware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// API - twilio
const accountSid = keys.accountSid;
const authToken = keys.authToken;
const client = require('twilio')(accountSid, authToken);

// API - google maps
const {Client} = require("@googlemaps/google-maps-services-js");
const mapsClient = new Client({});
const googleMapKey = keys.mapKey;

// methods
function sleep(ms) { // delay api requests to twilio to ensure messages get sent in the right order
  return new Promise(resolve => setTimeout(resolve, ms));
}

function sendSMS(msg, num) {
  if (num) {
    client.messages.create({
      body: msg,
      from: '+15739283231',
      to: num
    });
  }
}

async function instructionSMS(response, num, delay) {
  if (response && num && delay) {
    const instructionData = response.data["routes"][0]["legs"][0]["steps"]; //obj
    for (let [key, value] of Object.entries(instructionData)) { // access all steps of the route
      await sleep(delay);
      const keyInt = parseInt(key)+1

      let instructionText = value.html_instructions;
      let distance = value.distance.text;

      // format instructions
      instructionText = instructionText.replace(/<[^>]*>/g, "");
      instructionText = instructionText.replace("Destination", "\nDestination");
      instructionText = instructionText.replace("Take", "\nTake");

      // finalize text to send to client
      navigationText = "Step " + keyInt + ": " + instructionText + " for " + distance;
      if (keyInt == Object.entries(instructionData).length) { // check if destination step is reached
        sendSMS("(DESTINATION) - " + instructionText, num);
      } else {
        sendSMS(navigationText, num);
      }
    }
  }
}

// event handlers
app.get('/', (request, response) => {
  fs.readFile('./pages/home.html', 'utf8', (error, html) => {
      response.send(html); // host website homepage here
  });
});

app.post('/receive-sms', (request, response) => { // api endpoint for twilio http post
  const userText = request.body.Body;
  const userNumber = request.body.From;

  let userAddresses = userText.split(' to ');

  // get directions from api
  mapsClient.directions({
    params: {
      key: googleMapKey,
      origin: userAddresses[0],
      destination: userAddresses[1],
      mode: 'walking',
      region: 'CA'
    }
  }).then((response) => {
    if (response.statusText == "OK") {
      sendSMS("Here are the directions to your location:", userNumber);
      instructionSMS(response, userNumber, 1500);
    }
  }).catch((error) => {
    sendSMS("Sorry, we could not find directions to the location. Try again and make sure the destination is more specific!", userNumber);
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('App available on http://localhost:3000');
});