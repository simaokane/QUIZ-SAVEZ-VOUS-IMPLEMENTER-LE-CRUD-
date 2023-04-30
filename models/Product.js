const { mongoose } = require('./services/db');

const productSchema = mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  inStock: Boolean,
});

const Product = mongoose.model('Product', productSchema);

function createProduct({ description, inStock, name, price }) {
  const product = new Product({
    description,
    name,
    price,
    inStock,
  });
  return product.save();
}

function getProducts() {
  return Product.find({});
}

function getProduct(id) {
  return Product.findById(id);
}

function updateProduct(_id, newValues) {
  return Product.replaceOne({ _id }, { ...newValues, _id });
}

function deleteProduct(_id) {
  return Product.deleteOne({ _id });
}
module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
