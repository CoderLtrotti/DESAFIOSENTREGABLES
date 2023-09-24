import express from 'express';
import ContenedorManager from '../dao/ContenedorManager.js';
import { Router } from 'express';

const Productrouter = Router();

// Initialize the product manager
const contenedorManager = new ContenedorManager();

// Define the routes
Productrouter.get('/', async (req, res) => {
  try {
    const products = await contenedorManager.getAllProducts(req.query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving products.' });
  }
});

Productrouter.get('/:id', async (req, res) => {
  try {
    const product = await contenedorManager.getProductById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving product.' });
  }
});

Productrouter.post('/', async (req, res) => {
  try {
    const productData = req.body;

    if (!productData.name || !productData.price || !productData.category) {
      return res.status(400).json({ error: 'Los datos del producto son incompletos.' });
    }

    const savedProduct = await contenedorManager.createProduct(productData);
    res.status(201).json({ message: 'Producto guardado con éxito', product: savedProduct });
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ error: 'No se pudo crear el producto. Detalles: ' + error.message });
  }
});

  

Productrouter.put('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const updates = req.body;
    const updatedProduct = await contenedorManager.updateProduct(productId, updates);
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error updating product.' });
  }
});

Productrouter.delete('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await contenedorManager.deleteProduct(productId);
    res.json(deletedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting product.' });
  }
});

export default Productrouter;