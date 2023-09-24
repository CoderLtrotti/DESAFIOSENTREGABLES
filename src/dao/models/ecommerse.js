const mongoose = require('mongoose');

// Esquema para la colección "carts"
const cartSchema = new mongoose.Schema({
  // Propiedades del esquema
  // ...
});

// Esquema para la colección "messages"
const messageSchema = new mongoose.Schema({
  // Propiedades del esquema
  // ...
});

// Esquema para la colección "products"
const productSchema = new mongoose.Schema({
  // Propiedades del esquema
  // ...
});

// Modelos de Mongoose para cada colección
const Cart = mongoose.model('Cart', cartSchema);
const Message = mongoose.model('Message', messageSchema);
const Product = mongoose.model('Product', productSchema);

// Exporta los modelos para que puedan ser utilizados en otros archivos
module.exports = {
  Cart,
  Message,
  Product,
};