const express = require("express");
const app = express();

const ProductManager = require("./ProductManager");
const manager = new ProductManager("src/products.json");

app.use(express.urlencoded({extended: true}));

//Pagina principal
app.get("/", async (req, res) => {
    res.send ("Probando pagina principal");
})

//Muestro todos los productos y puedo ponerle un limite
app.get("/products", async (req, res) => {
    let limit = req.query.limit;
    let products = await manager.getProduct();
    res.send(products.slice(0, limit));
});

//Pagina con el producto solicitado por ID - ME TIRA SIEMPRE QUE NO EXISTE ESE ID
app.get("/products/:pid", async (req, res) => {
    let pid =  Number(req.params.pid) ;
    let product = await manager.getProductById(pid)
        if(product){
            res.send(product)
        }else{
            res.send(`No existen resultados para el ID: ${pid}`)
        }
})

const server = app.listen(8080, () => {
    console.log("Server running on port 8080");
});
server.on("error", (error) => console.log(error));