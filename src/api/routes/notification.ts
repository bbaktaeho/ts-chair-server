import * as admin from "firebase-admin";
const fireKey = require("../../../keys/chaircommunication-firebase-adminsdk-xwt5i-fab6738421.json");

admin.initializeApp({
  credential: admin.credential.cert(fireKey),
  databaseURL: "https://chaircommunication.firebaseio.com",
});

var registrationToken = "YOUR_REGISTRATION_TOKEN";

var payload = {
  notification: {
    title: "hi",
    body: "안녕?",
  },
};

var message = {
  data: {
    score: "850",
    time: "2:45",
  },
  token: registrationToken,
};

admin
  .messaging()
  .sendToDevice(registrationToken, payload)
  .then((data) => {
    console.log("Successfully sent message:", data);
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

// Send a message to the device corresponding to the provided
// registration token.
// admin
//   .messaging()
//   .send({
//     data: {},
//     token: registrationToken,
//   })
//   .then((response) => {
//     // Response is a message ID string.
//     console.log("Successfully sent message:", response);
//   })
//   .catch((error) => {
//     console.log("Error sending message:", error);
//   });
