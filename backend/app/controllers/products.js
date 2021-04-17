module.exports.getProducts = async (application, req, res) => {
    const data = req.body,
        repository = new application.app.repositories.Products();
        repository.get(data, res);
};

module.exports.postProduct = async (application, req, res) => {
    const data = req.body,
        repository = new application.app.repositories.Products();
        repository.post(data, res);
};

module.exports.editProduct = async (application, req, res) => {
    const data = req.body,
        repository = new application.app.repositories.Products();
        repository.edit(data, res);
};

module.exports.deleteProduct = async (application, req, res) => {
    const data = req.params,
        repository = new application.app.repositories.Products();
        repository.delete(data, res);
};
