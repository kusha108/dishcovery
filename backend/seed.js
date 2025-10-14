require('dotenv').config();
const connectDB = require('./config/db');
const User = require('./models/User');
const Recipe = require('./models/Recipe');
const bcrypt = require('bcryptjs');

(async () => {
  await connectDB();
  await User.deleteMany({});
  await Recipe.deleteMany({});

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('password123', salt);

  const user = await User.create({
    name: 'Demo User',
    email: 'demo@dishcovery.local',
    password: hashedPassword
  });

  await Recipe.create({
    title: 'Chocolate Cake',
    description: 'Delicious homemade chocolate cake.',
    ingredients: ['Flour', 'Sugar', 'Cocoa', 'Eggs'],
    steps: ['Mix ingredients', 'Bake at 180°C'],
    author: user._id
  });

  console.log('✅ Seed data added');
  process.exit();
})();
