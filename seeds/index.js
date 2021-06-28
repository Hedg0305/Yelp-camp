const mongoose = require('mongoose');
const Campground = require('../models/campground')

const cities = require('./cities')
const { places, descriptors } = require('./seedsHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected")
})

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedsDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++){
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '60d7734521941f399404618f',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      geometry: {
        type: 'Point',
        coordinates: [cities[random1000].longitude, cities[random1000].latitude]
      },
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam labore facilis animi cupiditate! Eum exercitationem unde delectus ex modi sint odio similique quod doloribus totam iure, dicta repellendus nam voluptates.',
      price,
      images: [
        {
          url: 'https://res.cloudinary.com/dpzua8wiv/image/upload/v1624886065/YelpCamp/tmqvscjzo5ufpb9hcxki.jpg',
          filename: 'YelpCamp/tmqvscjzo5ufpb9hcxki'
        },
        {
          url: 'https://res.cloudinary.com/dpzua8wiv/image/upload/v1624886066/YelpCamp/yctdcpcsfivsa7rqqx6n.jpg',
          filename: 'YelpCamp/yctdcpcsfivsa7rqqx6n'
        }
      ],
    })
    await camp.save();
  }
}

seedsDB().then(() => {
  mongoose.connection.close();
})