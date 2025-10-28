// scripts/initCounter.js
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/user');
const Counter = require('./models/Counter');

async function init() {
  await mongoose.connect(process.env.MONGO_URI);
  const maxUser = await User.findOne({ userId: { $exists: true } }).sort({ userId: -1 }).lean();
  const maxId = maxUser ? maxUser.userId : 500034; // if none exist, set base
  const currentSeq = maxId - 500034; // if maxId==500034 => seq 0

  await Counter.findOneAndUpdate(
    { name: 'userId' },
    { $set: { seq: currentSeq } },
    { upsert: true }
  );

  console.log('Counter initialized to seq =', currentSeq);
  process.exit(0);
}

init().catch(err => {
  console.error(err);
  process.exit(1);
});
