const express = require("express");
const app = express();
const productsRouter = require("./routes/products")
const cartRouter = require("./routes/cart")



// const ProductManager = require("./productManager");
// const manager = new ProductManager("src/products.json");

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use("/products", productsRouter)
app.use("/cart", cartRouter)

const server = app.listen(8080, () => {
    console.log("Server running on port 8080");
});
server.on("error", (error) => console.log(error));