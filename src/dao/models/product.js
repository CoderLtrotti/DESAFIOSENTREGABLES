import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  _id: {
    type: String, // Utilizamos String en lugar de ObjectId
    required: true,
  },
  
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,  
  },
  availability: {
    type: Boolean,
    required: true,
  }
});

const Product = mongoose.model('Product', productSchema);

const productsData = [
  {
    name: 'Juego De Mesa Oca Matic',
    price: 9.99,
    description: 'Juegos',
    category: 'Juegos de mesa',
    availability: true,
  },
  {
    name: 'Muñeco Capitan America',
    price: 29.99,
    description: 'Muñeco Classic',
    category: 'Peluches',
    availability: true,
  },
  // Agrega más objetos de productos si es necesario
];

Product.insertMany(productsData)
  .then(() => {
    console.log('Productos guardados en la base de datos');
  })
  .catch((error) => {
    console.error('Error al guardar los productos:', error);
  })


export default Product;