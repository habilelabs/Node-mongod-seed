var Status = function(code, message, data) {
    this.code = code;
    this.message = message;
    this.data = data;
};

Status.OK = 0;
Status.TIMEOUT = 1;
Status.IN_PROGRESS = 2;
Status.ERROR = -1;
Status.AUTH_FAILED = -2;
Status.PERM_DENIED = -3;

module.exports = Status;



