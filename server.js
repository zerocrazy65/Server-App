var admin = require("firebase-admin");
// Initialize Firebase Admin SDK with service account credentials
var serviceAccount = require("./tactical-app-firebase-adminsdk-vfdhh-251439f642.json");



admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tactical-app-default-rtdb.firebaseio.com"
});

// Get a reference to the Realtime Database
const database = admin.database();

// Get a reference to the Firestore
const firestore = admin.firestore();
const username = 'username';
const ref = database.ref("/" + username);
ref.on("value", (snapshot) => {
  
  const data = snapshot.val();
  console.log(data);
  const document =  {
    Score : data.score,
    Time : data.time,
  }
  const resetData = {
    score:0,
    status: false,
    time: 3.00,
  };
  // Convert the data to an array of objects
  // Save the data to Firestore
    if (data.status === true) {
      firestore.collection("TestData").add(document);
      ref.update(resetData)
    }
});
