const express = require('express');
const app = express();
const cors = require('cors');
const paypal = require('paypal-rest-sdk');
require('dotenv').config();

paypal.configure({
  mode: 'sandbox',
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.post('/pay', (req, res) => {
  const create_payment_json = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal'
    },
    redirect_urls: {
      return_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel'
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: 'React Course',
              sku: '001',
              price: '25.00',
              currency: 'AUD',
              quantity: 2
            }
          ]
        },
        amount: {
          currency: 'AUD',
          total: '50.00'
        },
        description: 'Course for React Developer'
      }
    ]
  };

  paypal.payment.create(create_payment_json, function(error, payment) {
    if (error) {
      throw error;
    } else {
      for (let link of payment.links) {
        if (link.rel === 'approval_url') {
          res.redirect(link.href);
        }
      }
    }
  });
});

app.listen(process.env.PORT || 5000);
