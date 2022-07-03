/* eslint-disable no-undef */
const mongoose = require("mongoose");

const configDb = () => {
  mongoose
    .connect(process.env.MONGO_URI || 'mongodb://localhost/review')
    .then((c) => {
      console.log(`Mongodb connect to: ${c.connection.host}`);
    })
    .catch((e) => {
      console.log(e);
    });
};

module.exports = configDb;
