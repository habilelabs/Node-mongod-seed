class messages {
    // Get all type of messages
     static getMessages() {
        return {
            MESSAGES: {
                MISSING: {
                    EMAIL: "Missing email parameter.",
                    NAME: "Missing name parameter.",
                    FIRST: "Missing first name parameter.",
                    LAST: "Missing last name parameter.",
                    PASSWORD: "Missing password parameter."
                },
                USER: {
                    CREATE: {
                        SUCCESS: "User created.",
                        DUPLICATE: "User already exists.",
                        ERROR: "Error in registration.",
                        PERM_DENIED: "You don't have permission to create new user."
                    },
                    GET: {
                        SUCCESS: 'User found.',
                        ERROR: "Error retrieving user data.",
                        ERROR_NO_USER: "No user with id ",
                        NO_USER: "No user found."
                    },
                    LOGIN: {
                        SUCCESS: "Successfully logged in.",
                        ERROR: "Error logging in"
                    },
                    LOGOUT: {
                        SUCCESS: "Successfully logged out.",
                        ERROR: "Error logging out"
                    },
                    UPDATE: {
                        SUCCESS: "User {userId} updated.",
                        ERROR: "Error updating user."
                    },
                    DELETE: {
                        SUCCESS: "User {userId} deleted.",
                        ERROR: "Error deleting user."
                    }
                },
                AUTH: {
                    UPDATE_ERROR: "Error updating token!",
                    TOKEN_VALID: "Token is valid!",
                    TOKEN_INVALID: "Token is invalidated!",
                    TOKEN_ERROR: "Error validating token!",
                    TOKEN_EXPIRE: "Invalid or expired token!",
                    TOKEN_PAYLOAD_ERROR: "Invalid token payload!",
                    LOGGED_OUT: "You were logged out!",
                    LOGGED_OUT_ERROR: "Token invalidated because last valid check failed.",
                    PERM_DENIED: "You don't have permission."
                }
            },
            ROLES: {
                ADMIN: "admin",
                USER: "user"
            },
            "EMAIL_NOT_PROVIDED":"Email is not Provided.",
            "PASSWORD_NOT_PROVIDED":"Password not Provided.",
            "EMAIL_AND_PASSWORD_NOT_PROVIDED":"Email and Password is not Provided.",
            "ERROR_IN_GETTING_USER":"Error in getting User.",
            "ERROR_IN_GETTING_USERS":"Error in getting Users.",
            "ERROR_IN_CREATING_USER":"Error in creating User.",
            "USER_NOT_AVAILABLE_WITH_THIS_EMAIL":"User Not Available for this Email.",
            "WRONG_PASSWORD":"Wrong Password",
            "EMAIL_AND_PASSWORD_NOT_MATCHED":"Email and password not Matched.",
            "EMAIL_COMPULSORY" : "Email is compulsory field",
            "PASSWORD_COMPULSORY" : "Password is compulsory field",
            "CREATION_SUCCESS": 'successfully created',
            "DELETION_SUCCESS":"Successfully deleted",
            "USER_UPDATED":"User updated Successfully",
            "ERROR_IN_DECODING_TOKEN":"Error in Decoding Token"
        };
    }
}

module.exports =  messages.getMessages();
