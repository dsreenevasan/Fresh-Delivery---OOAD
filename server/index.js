module.exports = function(app){
    app.use('/user/login', require('./router/routes/route'));
    app.use('/api', require('./router/routes/route'));
};