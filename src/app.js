const express = require("express");
const app = express();
const productsRouter = require("./routes/products")
const cartRouter = require("./routes/cart")
const realTimeProductsRouter = require("./routes/realTimeProducts")
const {Server, Socket} = require("socket.io")

//Para poder utilizar el metodo getProduct de la linea 18
const ProductManager = require("./ProductManager");
const managerProduct = new ProductManager("./src/products.json");

//Handlebars
const exphbs = require("express-handlebars")
app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")
app.set("views", "./views")

app.get("/", async (req, res) => {
    let products = await managerProduct.getProduct() //Traigo el metodo get products para poder mostrar los productos en home.handlebars
    res.render("home", {products})
})
////

//Socket
app.get("/io", (req, res)=>{
    res.send("socket ok")
})


app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use("/products", productsRouter) //Products.js
app.use("/cart", cartRouter) //Cart.js
app.use("/realTimeProducts", realTimeProductsRouter) //RealTimeProducts.js
app.use(express.static("public"))





let dataCompleta = []

const httpServer = app.listen(8080, () => {
    console.log("Server running on port 8080");
});
httpServer.on("error", (error) => console.log(error));

const io = new Server(httpServer)

io.on("connection", socket => {
    console.log("Nuevo cliente conectado");

    socket.on("message", data => {
        dataCompleta.push(data)
        console.log(data);
    })
})

