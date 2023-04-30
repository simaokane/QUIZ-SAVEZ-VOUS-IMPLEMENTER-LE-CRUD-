require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//app.use(express.json());
const port = 3000;

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require('./models/Product');

//Middleware------------------------------------------------------------
app.use(bodyParser.json());

//Cors-------------------------------------------------------------------
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

//ROUTES---------------------------------------------------------------
app.post('/api/products', async (req, res) => {
  try {
    const product = await createProduct(req.body);
    res.send({ product });
  } catch (err) {
    console.error(err);
  }
});

app.get('/api/products', async (req, res) => {
  const result = await getProducts();
  res.send({ products: result });
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const product = await getProduct(id);
    res.send({ product });
  } catch (err) {
    console.error(err);
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await updateProduct(id, req.body);
    res.send({ message: 'Modified' });
  } catch (err) {
    console.error(err);
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const result = await deleteProduct(req.params.id);
    res.send({ message: 'Deleted!' });
  } catch (err) {
    console.error(err);
  }
});

app.get('/', (req, res) => {
  res.send('Hello ' + req.query.name);
});

app.listen(port, () => {
  console.log('Le serveur ecoute le port ' + port);
});
