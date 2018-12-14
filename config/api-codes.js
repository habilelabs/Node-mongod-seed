class apiCodes {
    // List of all api codes
    static getCodes() {
        return {
            "SUCCESS": 200,
            "INTERNAL_ERROR" : 500,
            "BAD_REQUEST":400,
            "UNAUTHORIZED" :401,
            "FORBIDDEN" : 403,
            "DUPLICATE":409,
            "NOT_FOUND":404

        };
    }
}

module.exports = apiCodes.getCodes();