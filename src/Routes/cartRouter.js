import { Router } from 'express';
import CartManager from '../dao/cartsManajer.js'; 

const router = Router();
const cartManager = new CartManager();

// DELETE /api/carts/:cid/products/:pid - Remove a product from the cart
router.delete('/:cid/:productId/:pid', cartManager.removeProduct);

// PUT /api/carts/:cid - Update the cart with an array of products
router.put('/:cid', cartManager.updateCart);

// PUT /api/carts/:cid/products/:pid - Update the quantity of a product in the cart
router.put('/:cid/:productId/:pid', cartManager.updateProductQuantity);

// DELETE /api/carts/:cid - Remove all products from the cart
router.delete('/:cid', cartManager.clearCart);

// GET CART
router.get('/:cid', cartManager.getCart);

router.post('/:cid/:productId', cartManager.addProduct);
// CREATE CART
router.post('/', cartManager.createCart);
 
router.delete('/:cid', cartManager.clearCart);
//RUTA PARA ELIMINAR EL CARRITO DE LA BASE DE DATOS , SE DEBE COMENTAR CLEAR CAR
//*router.delete('/:cartId', cartManager.deleteCartById);/*


export default router;