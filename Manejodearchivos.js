const fs = require('fs').promises;

class Contenedor {
  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
    this.lastProductId = 0;
    this.initialize();
  }

  async initialize() {
    try {
      await fs.readFile(this.nombreArchivo, 'utf-8');
    } catch (error) {
      // Si el archivo no existe, lo creamos con un arreglo vacío
      await fs.writeFile(this.nombreArchivo, '[]', 'utf-8');
    }
  }

  async save(object) {
    try {
      const data = await this.getAll();
      const newId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
      const newObj = { ...object, id: newId };
      data.push(newObj);
      await fs.writeFile(this.nombreArchivo, JSON.stringify(data, null, 2), 'utf-8');
      return newId;
    } catch (error) {
      console.error('Error al guardar el objeto:', error);
      return -1;
    }
  }

  async getById(id) {
    try {
      const data = await this.getAll();
      const object = data.find((obj) => obj.id === id);
      return object || null;
    } catch (error) {
      console.error('Error al obtener el objeto por ID:', error);
      return null;
    }
  }

  async getAll() {
    try {
      const fileContent = await fs.readFile(this.nombreArchivo, 'utf-8');
      return JSON.parse(fileContent);
    } catch (error) {
      console.error('Error al obtener todos los objetos:', error);
      return [];
    }
  }

  async deleteById(id) {
    try {
      const data = await this.getAll();
      const newData = data.filter((obj) => obj.id !== id);
      await fs.writeFile(this.nombreArchivo, JSON.stringify(newData, null, 2), 'utf-8');
      return "Producto eliminado";
    } catch (error) {
      console.error('Error al eliminar el objeto por ID:', error);
      return "Error al eliminar el producto";
    }
  }

  async deleteAll() {
    try {
      await fs.writeFile(this.nombreArchivo, '[]', 'utf-8');
    } catch (error) {
      console.error('Error al eliminar todos los objetos:', error);
    }
  }
}

// Ejemplo de uso
async function test() {
  try {
    const contenedor = new Contenedor('productos.txt');

    const productId1 = await contenedor.save({ title: 'Camiseta', price: 20, thumbnail: 'ruta_imagen1.jpg' });
    const productId2 = await contenedor.save({ title: 'Pantalón', price: 40, thumbnail: 'ruta_imagen2.jpg' });
    const productId3 = await contenedor.save({ title: 'Zapatos', price: 50, thumbnail: 'ruta_imagen3.jpg' });

    console.log(await contenedor.getAll());

    // Eliminar un objeto por su ID
    const deleteResult = await contenedor.deleteById(productId1);
    console.log(deleteResult); // Imprimirá "Producto eliminado" o "Error al eliminar el producto"
    console.log("Producto Eliminado");

    console.log("Lista de objetos después de eliminar:");
    console.log(await contenedor.getAll());
  } catch (error) {
    console.error('Error:', error);
  }
}

test();