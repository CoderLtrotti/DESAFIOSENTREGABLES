import express from 'express';
import Contenedor from './Manejodearchivos.js';



const app = express();
const contenedor = new Contenedor('productos.txt');

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// Ruta para obtener todos los productos
app.get('/productos', async (req, res) => {
  const products = await contenedor.getAll();
  res.json(products);
});

app.get('/productoRandom', async (req, res) => {
  const products = await contenedor.getAll();
  const randomIndex = Math.floor(Math.random() * products.length);
  res.json(products[randomIndex]);
});

app.post('/productos', async (req, res) => {
  const newProduct = req.body;
  const productId = await contenedor.save(newProduct);
  res.json({ id: productId });
});

app.delete('/productos/:id', async (req, res) => {
  const productId = parseInt(req.params.id);
  const deleteResult = await contenedor.deleteById(productId);
  if (deleteResult === "Producto eliminado") {
    res.json({ message: "Producto eliminado" });
  } else {
    res.status(404).json({ error: "Error al eliminar el producto" });
  }
});


app.listen(8080, () => {
	console.log('Estoy escuchando el 8080');
});
