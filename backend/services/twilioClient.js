const twilio = require('twilio');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const from = process.env.TWILIO_FROM_NUMBER;

let client = null;
if (accountSid && authToken) {
  client = twilio(accountSid, authToken);
}

async function sendSms(to, body) {
  if (!client) {
    console.log('Twilio not configured. SMS not sent. to:', to, 'body:', body);
    return null;
  }
  return client.messages.create({ body, from, to });
}

module.exports = { sendSms };
