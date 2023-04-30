//Mongo
const mongoose = require('mongoose');
const login = process.env.LOGIN;
const password = process.env.PASSWORD;

//console.log({ password, login });

mongoose
  .connect(
    `mongodb+srv://${login}:${password}@cluster0.v6wmdi8.mongodb.net/?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('Connexion à MongoDB réussie !!!'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

module.exports = { mongoose };
