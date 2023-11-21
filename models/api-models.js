const apiJson = require('./../endpoints.json')
exports.selectApis = () => {
    return Promise.resolve( apiJson );
 } 
