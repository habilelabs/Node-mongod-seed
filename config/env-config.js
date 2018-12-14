class environment {
    // Get environment
    static getENV() {
        if(!process.env.NODE_ENV){
            process.env.NODE_ENV = 'development';
        }
        return require('./env/' + process.env.NODE_ENV);
    }
}

module.exports = environment;