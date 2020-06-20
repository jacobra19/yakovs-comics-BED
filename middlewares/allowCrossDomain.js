require('dotenv').config()

var allowCrossDomain = function(req, res, next) {
    if(process.env.DEV){
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
    }
    next();
}



module.exports = allowCrossDomain;
