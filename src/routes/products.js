const {Router} = require ("express")
const productsRouter = Router()

const ProductManager = require("../productManager");
const manager = new ProductManager("./src/products.json");

//Muestro todos los productos y puedo ponerle limite
productsRouter.get("/", async (req, res) => {
    let limit = req.query.limit;
    let products = await manager.getProduct();
    res.send(products.slice(0, limit));
});

//Buscar producto por ID
productsRouter.get("/:pid", async (req, res) => {
    let pid =  Number(req.params.pid) ;
    let product = await manager.getProductById(pid)
        if(product){
            res.send(product)
        }else{
            res.send(`No existen resultados para el ID: ${pid}`)
        }
})

//Agregar producto
productsRouter.post("/addProduct", async (req, res) => {
    let addProduct = await manager.addProduct(req.body)
    if(addProduct === "error"){
        res.status(400).send({error: "Faltan agregar campos"})
    }else{
        res.send(`Producto: ${req.body.title} agregado con exito`)
    }
})

//Actualizar producto
productsRouter.put("/:pid", async (req, res)=> {
    try {
        const id = Number(req.params.pid)
        const productUpdate = req.body
        await manager.updateProduct(id, productUpdate);
        res.send(`Producto con ID: ${productUpdate.id} actualizado correctamente`)
    }
    catch (error) {
        req.status(500).send({error: "No se pudo actualizar"})
    }
})

//Borrar producto
productsRouter.delete("/:pid", async (req, res) => {
    let pid =  Number(req.params.pid) 
    let borrar = await manager.deleteProduct(pid)
    if(!pid){
        res.status(400).send({error: `No existe el id ${pid}`})
    }else{
        res.send(`Producto con el ID ${pid} fue eliminado exitosamente`)
    }
})


module.exports = productsRouter