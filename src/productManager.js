const fs = require ("fs");

class ProductManager{
    path;

    constructor(path){
        this.path = path;
    }
    
    //Metodo para agregar productos
    async addProduct(product){
        try {
            if(!product.title && !product.description && !product.price && !product.code && !product.stock && !product.status && product.category){
                return "error";
            }

            let products = await this.getProduct();
            let maxId = 0;

            if (!products == []){
                if (products.forEach(product => {if (product.id > maxId) maxId=product.id
            }));
                ;
            }
            maxId++ //ID autoincrementable
            let newProduct = {
                    id: maxId,
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    thumbnail: product.thumbnail,
                    code: product.code,
                    stock: product.stock,
                    status: true,
                    category: product.category
                }
                products.push(newProduct);
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
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
    // async updateProduct (id, {title, description, price, thumbnail, code, stock}) {
    //     try {
    //         let products = await this.getProduct()
    //         let index = products.findIndex(product => product.id === id) //Busca el indice del array
    //         if (index === -1) {console.log("Not found")} 
    //         let existingProduct = products.some(product => product.code === code) //Chequea que el codigo exista
    //         if (existingProduct) {console.log(`El producto con el codigo ${code} ya fue agregado`)};
    //         let productToUpdate = {title, description, price, thumbnail, code, stock}
    //         products[index] = productToUpdate;
    //         await fs.promises.writeFile(this.path, JSON.stringify(products))
    //         return productToUpdate
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    async updateProduct(id, product) {
        try {
            const products = await this.getProducts()
            const position = products.findIndex((productId) => productId.id === id)
            console.log(position)
            product.id = id
            products.splice(position, 1, product)
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))
        }
        catch (error) {
            throw new Error(error)
        }
    }

    //Metodo para borrar productos
    async deleteProduct (id) {
        try {
            let products = await this.getProduct()
            let index = products.findIndex(product => product.id === id)
            if (index === -1) {console.log("Not found")}
            products.splice(index, 1) //Ver slice (no modifica array original)
            await fs.promises.writeFile(this.path, JSON.stringify(products))
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ProductManager;