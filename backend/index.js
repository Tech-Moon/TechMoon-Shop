const app = require('./config/server');

app.listen(5000, () => {
    console.log('Api em execução - port: 5000');
});