const {Router} = require('express');
const cartRouter = Router();

const CartManager = require("../cartManager");
const managerCart = new CartManager("./src/cart.json");

const ProductManager = require("../ProductManager");
const managerProduct = new ProductManager("./src/products.json");

cartRouter.post("/", async (req, res) => {
    try {
        await managerCart.createCart();
        res.send("Carrito creado exitosamente")
    }
    catch (error) {
        res.status(500).send({ error: "Error" })
    }
    res.send("carrito");
})

cartRouter.get('/:cid', async (req, res) => {
    const id = Number(req.params.cid)
    const productsInCart = await managerCart.getProductsInCart(id)
    res.send(productsInCart)
})

cartRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = Number(req.params.cid);
        const productId = Number(req.params.pid)
        const findProduct = await managerProduct.getProductById(productId)
        if (!findProduct) {
            res.status(404).send({ error: `El producto con el ID ${productId} no existe` })
        }
        else {
            await managerCart.addProductInCart(cartId, findProduct)
            res.send(`El producto con el ID ${productId} fue agregado exitosamente al carrito con ID ${cartId}`)
        }
    }
    catch (error) {
        res.status(500).send({ error: "Error" })
    }
})

module.exports = cartRouter