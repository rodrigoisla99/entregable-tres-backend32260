const {Router} = require ("express")
const realTimeProductsRouter = Router()

realTimeProductsRouter.get("/", async (req, res) => {
    res.send("Endpoint real time ok");
});




module.exports = realTimeProductsRouter