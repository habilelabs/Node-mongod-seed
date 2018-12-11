'use strict';

/**
 * Module init function.
 */
module.exports = {
    getENV : function() {
        //if no env defined then we will use development
        if(!process.env.NODE_ENV){
            process.env.NODE_ENV = 'development';
        }
        return require('./env/' + process.env.NODE_ENV);
    }
};