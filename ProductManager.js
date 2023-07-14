class ProductManager {
	constructor() {
		this.products = [];
		this.lastProductId = 0;
	}

	addProduct(title, price, thumbnail, code, stock) {
		if (!title || !price || !thumbnail || !code || !stock) {
			console.log("Todos los campos son obligatorios.");
			return;
		}

		const existingProduct = this.products.find((product) => product.code === code);
		if (existingProduct) {
			console.log("El código de producto ya existe.");
			return;
		}

		const newProduct = {
			id: this.lastProductId++,
			title,
			price,
			thumbnail,
			code,
			stock,
		};

		this.products.push(newProduct);
		console.log("Producto agregado correctamente.");
	}

	getProducts() {
		return this.products;
	}

	getProductById(productId) {
		const product = this.products.find((product) => product.id === productId);
		if (!product) {
			console.log("Producto no encontrado.");
			return null;
		}

		return product;
	}
}

const productManager = new ProductManager();
productManager.addProduct("Camiseta", 20, "ruta_imagen1.jpg", "001", 10);
productManager.addProduct("Pantalón", 40, "ruta_imagen2.jpg", "002", 5);
productManager.addProduct("Zapatos", 50, "ruta_imagen3.jpg", "003", 8);

console.log(productManager.getProducts());

const productById = productManager.getProductById(2);
console.log(productById);

const nonExistingProduct = productManager.getProductById(4);