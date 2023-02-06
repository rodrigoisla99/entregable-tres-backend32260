const fs = require("fs")

class CartManager {
    path;

    constructor(path) {
        this.path = path
    }

    //ID Incrementable
    async incrementableId() {
        let idMax = 0
        const dataParse = await this.getCart()
        dataParse.forEach(cart => {
            if (cart.id > idMax) {
                idMax = cart.id
            }
        });
        return idMax + 1
    }

    //Mostrar carrito
    async getCart() {
        try {
            let mostrar = await fs.promises.readFile(this.path, "utf-8")
            return JSON.parse(mostrar)
        }
        catch (error) {
            console.log(error);
        }
    }

    //Buscar productos por ID en el carrito
    async getProductsInCart(id) {
        try {
            const data = await this.getCart()
            const dataFind = data.find((cart)=> cart.id === id)
            return dataFind.products
        }
        catch (error) {
            console.log(error);
        }
    }

    //Crear carrito
    async createCart() {
        try {
            const dataParse = await this.getCart()
            dataParse.push({ id: await this.incrementableId(), products: [] })
            await fs.promises.writeFile(this.path, JSON.stringify(dataParse, null, 2))
        }
        catch (error) {
            console.log(error);
        }
    }

    //Agregar producto al carrito
    async addProductInCart(idCart, product) {
        try {
            let quantity = 1
            const data = await this.getCart()
            const indexData = data.findIndex((cart)=> cart.id === idCart )
            const dataProduts = data[indexData].products
            const findProduct = dataProduts.find((existProd)=>existProd.id === product.id)
            if(findProduct) {
                findProduct.quantity += 1
                fs.writeFileSync(this.path, JSON.stringify(data, null, 2))
            }
            else{
                dataProduts.push({id:product.id, quantity: quantity})
                fs.writeFileSync(this.path, JSON.stringify(data, null, 2))
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}

module.exports = CartManager