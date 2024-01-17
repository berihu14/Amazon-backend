
// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

const functions = require('firebase-functions');

const express = require('express');
const cors = require('cors');
const stripe = require("stripe")(
  'sk_test_51OOAKeJFy0pmBxb2uJAh5LSOw85jqvlog7ss0CIOAe3hH03hEUjkJcybQtbChlRozfh2nJgfyOg9WYwF4iId5KQJ00EMhjjn0s'
);

// App config
const app = express();


// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

app.get('/', (request, response) => response.status(200).send('hello world'));


app.post('/payments/create', async (request, response) => {
  const total = request.query.total;

  console.log('Payment Request Recieved for this amount >>> ', total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,  // Subunits of the currency
    currency: 'usd',
  });

  // Ok - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Listen command
exports.api = functions.https.onRequest(app);

// http://127.0.0.1:5001/project-a5b3e/us-central1/api
