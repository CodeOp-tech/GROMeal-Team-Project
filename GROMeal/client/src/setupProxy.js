const { createProxyMiddleware } = require('http-proxy-middleware'); 
 
module.exports = function(app) { 
 
    // URLs starting with /api go to http://localhost:5000/api 
    app.use('/api', createProxyMiddleware({ 
        target: 'http://localhost:5000', 
        changeOrigin: true,
        }) 
    ); 
 
    // URLs starting with /test go to http://localhost:3000/test 
    // app.use('/test', createProxyMiddleware({ 
    //     target: 'http://localhost:3000', 
    //     changeOrigin: true, 
    //     }) 
    // ); 
 
}; 