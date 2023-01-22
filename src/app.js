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

// app.get("/products/:pid", async (req, res)=> {
//     let pid = req.params.pid
//     let producto = await manager.getProduct().find(prod => prod.id === pid)
//     res.send(producto)
// })


//Pagina con el producto solicitado por ID - ME TIRA SIEMPRE QUE NO EXISTE ESE ID
app.get("/products/:pid", async (req, res) => {
    let pid = req.params.pid;
    let product = await manager.getProductById(pid)
        if(product){
            res.send(product)
        }else{
            res.send("No existe ese ID")
        }
})

const server = app.listen(8081, () => {
    console.log("Server running on port 8081");
});
server.on("error", (error) => console.log(error));