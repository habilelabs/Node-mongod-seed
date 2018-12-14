define({ "api": [
  {
    "type": "post",
    "url": "/api/v1/users",
    "title": "Create A new User",
    "version": "0.0.1",
    "name": "Create_A_new_User",
    "group": "Users",
    "header": {
      "fields": {
        "Headers": [
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNThkNTJkOGY2OGUzMDUwMDRjMGQ1NmFlIiwibGFzdFZhbGlkIjoiMjAxNy0wMy0yOFQwNjowMzowMy4zODBaIiwicm9sZSI6InN1cGVyX2FkbWluIiwiaWF0IjoxNDkwNjgwOTgzLCJleHAiOjE0OTA2ODE1ODN9.kQucJ-xeuMxEv-X-p72BW_0EewH6M3Jh4ByfHYg9hCI\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "name",
            "description": "<p>contains firstNAme and lastName of User.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User Email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User Password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>User Role.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Param-Example:",
          "content": "     {\n        \"email\":\"rohit@habilelabs.io\",\n     \"password\":\"rohit@123\",\n     \"role\":\"admin\",\n     \"name\" : {\n\t            \"firstName\":\"rohit\",\n\t            \"lastName\":\"katiyar\"\n                }\n     }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Successfully saved</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Created User data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  HTTP/1.1 200 OK\n   {\n\"message\": \"successfully created\",\n\"data\": {\n      \"email\": \"rohit@habilelabs.io\",\n   \"password\": null,\n   \"_id\": \"58d9f9e8c94fb70cf87b3c9e\",\n   \"updated\": {\n          \"on\": 1490680288433\n          },\n   \"created\": {\n          \"by\": \"58d52d8f68e305004c0d56ae\",\n          \"on\": 1490680288433\n          },\n   \"role\": \"admin\",\n   \"name\": {\n      \"firstName\": \"rohit\",\n      \"lastName\": \"katiyar\"\n              }\n   }\n   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/modules/user/user.controller.js",
    "groupTitle": "Users"
  },
  {
    "type": "delete",
    "url": "/api/v1/users/:userId",
    "title": "Delete a User By userId",
    "version": "0.0.1",
    "name": "Delete_a_User_By_userId",
    "group": "Users",
    "header": {
      "fields": {
        "Headers": [
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNThkNTJkOGY2OGUzMDUwMDRjMGQ1NmFlIiwibGFzdFZhbGlkIjoiMjAxNy0wMy0yOFQwNjowMzowMy4zODBaIiwicm9sZSI6InN1cGVyX2FkbWluIiwiaWF0IjoxNDkwNjgwOTgzLCJleHAiOjE0OTA2ODE1ODN9.kQucJ-xeuMxEv-X-p72BW_0EewH6M3Jh4ByfHYg9hCI\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>success Message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n        \"message\":\"Successfully Deleted\"\n }",
          "type": "json"
        }
      ]
    },
    "filename": "app/modules/user/user.controller.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/api/v1/users",
    "title": "Get All Users",
    "version": "0.0.1",
    "name": "Get_All_Users",
    "group": "Users",
    "header": {
      "fields": {
        "Headers": [
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNThkNTJkOGY2OGUzMDUwMDRjMGQ1NmFlIiwibGFzdFZhbGlkIjoiMjAxNy0wMy0yOFQwNjowMzowMy4zODBaIiwicm9sZSI6InN1cGVyX2FkbWluIiwiaWF0IjoxNDkwNjgwOTgzLCJleHAiOjE0OTA2ODE1ODN9.kQucJ-xeuMxEv-X-p72BW_0EewH6M3Jh4ByfHYg9hCI\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "data",
            "description": "<p>All User details</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n   \"data\": [\n     {\n       \"_id\": \"58d9193c5fa664244c866c1a\",\n       \"email\": \"rohit@habilelabs.io\",\n \"updated\": {\n    \"by\": \"58d52d8f68e305004c0d56ae\",\n    \"on\": 1490622785341\n  },\n \"created\": {\n    \"by\": \"58d52d8f68e305004c0d56ae\",\n    \"on\": 1490622684612\n  },\n \"role\": \"user\",\n \"name\": {\n    \"firstName\": \"rohit\"\n  }\n },\n {\n   \"email\": \"rohit_1@habilelabs.io\",\n \"_id\": \"58d9195d5fa664244c866c26\",\n \"updated\": {\n    \"on\": 1490622684612\n  },\n \"created\": {\n    \"by\": \"58d52d8f68e305004c0d56ae\",\n    \"on\": 1490622684612\n  },\n \"role\": \"admin\",\n \"name\": {\n    \"firstName\": \"rohit\"\n  }\n }\n ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "app/modules/user/user.controller.js",
    "groupTitle": "Users"
  },
  {
    "type": "put",
    "url": "/api/v1/users/:userId",
    "title": "Update a Particular User",
    "version": "0.0.1",
    "name": "Update_a_Particular_User",
    "group": "Users",
    "header": {
      "fields": {
        "Headers": [
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNThkNTJkOGY2OGUzMDUwMDRjMGQ1NmFlIiwibGFzdFZhbGlkIjoiMjAxNy0wMy0yOFQwNjowMzowMy4zODBaIiwicm9sZSI6InN1cGVyX2FkbWluIiwiaWF0IjoxNDkwNjgwOTgzLCJleHAiOjE0OTA2ODE1ODN9.kQucJ-xeuMxEv-X-p72BW_0EewH6M3Jh4ByfHYg9hCI\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "name",
            "description": "<p>contains firstNAme and lastName of User.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User Email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User Password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>User Role.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Param-Example:",
          "content": "     {\n        \"email\":\"rohit@habilelabs.io\",\n     \"password\":\"rohit@123\",\n     \"role\":\"admin\",\n     \"name\" : {\n\t            \"firstName\":\"rohit\",\n\t            \"lastName\":\"katiyar\"\n                }\n     }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>User updated Successfully</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n\"message\": \"User updated Successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/modules/user/user.controller.js",
    "groupTitle": "Users"
  },
  {
    "type": "POST",
    "url": "/api/v1/user/login",
    "title": "User Login",
    "version": "0.0.1",
    "name": "User_Login",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User Email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User Password.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Param-Example:",
          "content": "{\n   \"email\":\"rohit@habilelabs.io\",\n\"password\":\"rohit@123\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>User token</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>User object conatins email and role</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "expires",
            "description": "<p>Time to expire a token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n \"user\": {\n   \"email\": \"rohit@habilelabs.io\",\n \"role\": \"admin\"\n },\n \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNThkNTJkOGY2OGUzMDUwMDRjMGQ1NmFlIiwibGFzdFZhbGlkIjoiMjAxNy0wMy0yOFQwNjoyNDoyNi4wODFaIiwicm9sZSI6InN1cGVyX2FkbWluIiwiaWF0IjoxNDkwNjgyMjY2LCJleHAiOjE0OTA2ODI4NjZ9.UA0WedOkD6yywEd16a5iVZTPQanNa4ZtUWx5roP89Vg\",\n \"expires\": \"2017-03-28T06:34:26.000Z\"\n }",
          "type": "json"
        }
      ]
    },
    "filename": "app/modules/user/user.controller.js",
    "groupTitle": "Users"
  }
] });
