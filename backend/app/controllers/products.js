module.exports.getProducts = async (application, req, res) => {
    const data = req.body,
        repository = new application.app.repositories.Products();
        repository.select(data, res);
}

module.exports.postProduct = async (application, req, res) => {
    const data = req.body,
        repository = new application.app.repositories.Products();
        repository.insert(data, res);
}

module.exports.editProduct = async (application, req, res) => {
    const data = req.body,
        repository = new application.app.repositories.Products();
        repository.update(data, res);
}

module.exports.deleteProduct = async (application, req, res) => {
    const data = req.params,
        repository = new application.app.repositories.Products();
        repository.delete(data, res);
}
