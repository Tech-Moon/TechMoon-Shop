module.exports = (application) => {
    application.get('/list-products', (req, res) => {
        application.app.controllers.products.getProducts(application, req, res);
    });

    application.post('/create-product', (req, res) => {
        application.app.controllers.products.postProduct(application, req, res);
    });

    application.put('/update-product', (req, res) => {
        application.app.controllers.products.editProduct(application, req, res);
    });

    application.delete('/delete-product/:id', (req, res) => {
        application.app.controllers.products.deleteProduct(application, req, res);
    });
}
