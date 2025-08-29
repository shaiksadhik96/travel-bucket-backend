const mongoose = require('mongoose');
const Place = require('../../models/Place');

// Connect to MongoDB (reuse connection if possible)
let conn = null;
async function connectToDatabase() {
  if (conn == null) {
    conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  return conn;
}

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  await connectToDatabase();
  const data = JSON.parse(event.body);
  try {
    const place = await Place.create(data);
    return {
      statusCode: 201,
      body: JSON.stringify(place),
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
