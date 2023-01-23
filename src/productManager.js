const fs = require ("fs");

class ProductManager{
    path;

    constructor(path){
        this.path = path;
    }
    
    //Metodo para agregar productos
    async addProduct(title, description, price, thumbnail, code, stock){
        try {
            if(!title || !description || !price || !thumbnail || !code || !stock){
                console.log("Faltan completar campos");
                return;
            }

            let products = await this.getProduct();
            let maxId = 0;

            if (!products == []){
                if (products.some(check => check.code === code)) console.log(`El producto con el codigo ${code} ya fue agregado`);
                products.forEach(product => {if (product.id > maxId) maxId=product.id
            });
            }
            maxId++ //ID autoincrementable
            let newProduct = {
                    id: maxId,
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock,
                }
                products.push(newProduct);
                await fs.promises.writeFile(this.path, JSON.stringify(products));
                return console.log("Se agregó exitosamente");
        } catch (error) {
            console.log(error);
        }        
    }

    //Metodo para mostrar los productos
    async getProduct(){
        try {
            let mostrar = await fs.promises.readFile(this.path,"utf-8")
                return JSON.parse (mostrar);
        } catch (error) {
            console.log(error);
        }
    }

    //Metodo para buscar por ID
    async getProductById (id) {
        let read = await fs.promises.readFile(this.path, "utf-8")
        let transformation = JSON.parse(read)
        let resultadoValorBuscado = transformation.find(producto => producto.id === id)
        if (resultadoValorBuscado == undefined){
            return console.log("Not Found");
        }else{
            return resultadoValorBuscado;
        } 
    }

    //Metodo para actualizar productos
    async updateProduct (id, {title, description, price, thumbnail, code, stock}) {
        try {
            let products = await this.getProduct()
            let index = products.findIndex(product => product.id === id) //Busca el indice del array
            if (index === -1) {console.log("Not found")} 
            let existingProduct = products.some(product => product.code === code) //Chequea que el codigo exista
            if (existingProduct) {console.log(`El producto con el codigo ${code} ya fue agregado`)};
            let productToUpdate = {title, description, price, thumbnail, code, stock}
            products[index] = productToUpdate;
            await fs.promises.writeFile(this.path, JSON.stringify(products))
            return productToUpdate
        } catch (error) {
            console.log(error);
        }
    }

    //Metodo para borrar productos
    async deleteProduct (id) {
        try {
            let products = await this.getProduct()
            let index = products.findIndex(product => product.id === id)
            if (index === -1) {console.log("Not found")}
            products.splice(index, 1)
            await fs.promises.writeFile(this.path, JSON.stringify(products))
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ProductManager;