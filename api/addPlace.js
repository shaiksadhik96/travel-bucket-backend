import mongoose from 'mongoose';
import Place from '../models/Place.js';

res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
if (req.method === 'OPTIONS') {
  res.status(200).end();
  return;
}
let conn = null;
async function connectToDatabase() {
  if (!conn) {
    conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  return conn;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  await connectToDatabase();
  try {
    const place = await Place.create(req.body);
    res.status(201).json(place);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
