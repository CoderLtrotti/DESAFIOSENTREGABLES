import mongoose from 'mongoose';
import Product from './models/product.js'; // Ruta correcta a tu modelo Product

class ContenedorManager {
  constructor() {
    constructor() 
      this.connection = null;
      this.Product = null;
    }
  
    async createProduct(productData) {
      try {
        if (
          !productData.name ||
          !productData.price ||
          !productData.description ||
          !productData.category ||
          productData.availability === undefined
        ) {
          throw new Error('Todos los campos requeridos deben estar presentes.');
        }
  
        // Crea una nueva instancia del modelo Product y guárdala en la base de datos
        const newProduct = new Product(productData);
        const savedProduct = await newProduct.save();
  
        return savedProduct;
      } catch (error) {
        console.error('Error creando el producto:', error);
        throw error;
      }
    }
  
  
  
    async getProductById(productId) {
      try {
        const product = await Product.findById(productId);
        return product;
      } catch (error) {
        console.error('Error retrieving product:', error);
        throw error;
      }
    }
  
    async getAllProducts(filters) {
      try {
        const page = parseInt(filters.page) || 1; 
        const limit = parseInt(filters.limit) || 10;
        const skip = (page - 1) * limit;
      console.log(filters);
        let query = {};
    
        // Add filtering for category and availability if they are defined
        if (filters.category) query.category = filters.category;
        if (filters.availability !== undefined) query.availability = filters.availability;
    
        // Sort by given field and order
        let sortObj = {};
        if (filters.sort) {
          const sortField = Object.keys(filters.sort)[0];
          const sortOrder = filters.sort[sortField];
          sortObj[sortField] = sortOrder === 'desc' ? -1 : 1;
        }
    
        const products = await Product.find(query)
          .skip(skip)
          .limit(limit)
          .sort(sortObj);
    
        return products;
      } catch (error) {
        console.error('Error retrieving products:', error);
        throw error;
      }
    }
  
    async updateProduct(productId, updates) {
      try {
        const updatedProduct = await this.Product.findByIdAndUpdate(
          productId,
          updates,
          { new: true }
        );
        return updatedProduct;
      } catch (error) {
        console.error('Error updating product:', error);
        throw error;
      }
    }
  
    async deleteProduct(productId) {
      try {
        const deletedProduct = await Product.findByIdAndDelete(productId);
        return deletedProduct;
      } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
      }
    }
  }

export default ContenedorManager;