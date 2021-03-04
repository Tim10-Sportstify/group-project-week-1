## API Doc for the server ##

# Sportstify

## API Documentations

This app has:
1. RESTful endpoints 
2. GOOGLE OAUTH
3. NEWS API
4. AVATAR GENERATOR API
2. FOOTBALL'S API

This app has dependency:
1. Express JS Framework
2. PostgreSQL
3. Sequelize ORM
4. JSON Web Tokens JS
5. Bcrypt JS
6. Axios
7. Body-parser
8. Cors
9. Google-auty-library
10. Jquery JS
11. Jsonwebtoken
12. dotENV

EndPonints list:
1. POST /register
2. POST /login
3. POST /googleLogin


## POST /register
Submit form login

- Request Header
```JSON
    not needed        
```

- Request body
```JSON
    {
        "email": "email",
        "password": "password",
    }
```

- Response (201) Created
```JSON
    {
        "email": "email",
        "password": "password",
    }
```

- Response (400) Bad Request
``` JSON
    [
        {
            "message": "Username dan Password wajib diisi"
        },
    ]
```

### POST /login
Submit form login

- Request Header
```JSON
    not needed        
```

- Request body
```JSON
    {
        "email": "email",
        "password": "password",
    }
```

- Response (200) Ok
```JSON
    {
        "access_token": "<your access token>"
    }
```

- Response (400) Bad Request
``` JSON
    [
        {
            "message": "Invalid Username / Password"
        },
    ]
```

### POST /loginGoogle
Submit form login

- Request Header
```JSON
    not needed        
```

- Request body
```
    <id_token generateByGoogle>
```

- Response (200) Ok
```JSON
    {
        "access_token": "<your access token>",
        "name": "roli"
    }
```

- Response (401) Unauthorize
``` JSON
    [
        {
            "message": "Unauthorize"
        },
    ]
```