# Assignment  
1. Introduction  
  i. Assumptions  
  ii. Endpoints  
  iii. Approach  
2. Running  
  i. Locally  
  ii. On Heroku  
  iii. With ngrok  
3. Usage  
  i. Creating a product  
  ii. Retrieving a product  
  iii. Updating a product  
  iv. Deleting a product
4. Testing  

## Introduction  
### Assumptions  
The API is created with the following assumptions:  

1. MongoDB is the backing database.  
2. There are just 4 operations - GET, POST, PUT, and DELETE.  
3. Auth token is provided and validated by another service and thus checking the validaity of the token is implemented as a simple function call that checks dummy tokens.  
4. Products are defined by a few mandatory fields - title, category, price, quantity and status (in-stock, discontinued, etc.).

### Endpoints  
As mentioned, there are 4 endpoints.  

`GET /v1/product/:id` to get information about a specific product.  
`POST /v1/product/` to insert a new product into the database.  
`DELETE /v1/product/:id` to delete a specific product.  
`PUT /v1/product/:id` to update a specific product.  

### Approach
The API is created as a series of endpoints defined in a [`Router`](https://github.com/littlejavachild/rest_api/blob/master/lib/router.js) instance. The `Router` expects a method, an endpoint, and a callback function that will handle the request.
Each time an API call is made, the callback function is invoked and is passed the request and response object along with a connection to the database.  

The server is created using the standard [`http module`](https://nodejs.org/api/http.html).  

All the database logic is encapsulated in a separate [`db`](https://github.com/littlejavachild/rest_api/blob/master/lib/db.js) module. The specifics of what database is being used are hidden from the core API. This is intentionally done to ensure that the database can be changed later without affecting the API as long as the interface exposed by the module stays unchanged.  

All modules are promisified and thus EcmaScript-6 compliant.  

## Running  
### Locally 

Assuming you have NodeJS and MongoDB installed,  

1. Start an instance of MongoDB.  
2. Clone the repo.  
3. Start a terminal and navigate into the repo. 
4. execute `npm install`.
5. execute `npm start`.  

You can set 3 environment variables `MONGODB_URI`, `VERSION`, and `PORT`. By default, the API attempts to connect to a local instance of MongoDB on the standard port and mounts the `v1` of the API on port 8080.  

### On Heroku  
### With ngrok  

## Usage  

### Creating a product

To create a product, execute the following `curl` command:

    curl -H "Authorization: Bearer Ym9zY236Ym9zY28=" localhost:8080/v1/product/ -d '{"title":"Nike Shoes","category":"shoes","price":100,"quantity":4,"status":5}'  
    
Response:  

    {
        "success": true,
        "code": 201,
        "result": {
            "__v": 0,
            "title": "Nike Shoes",
            "category": "shoes",
            "price": 100,
            "quantity": 4,
            "status": 5,
            "_id": "581b6214f49e0c347657ae13"
        }
    }

### Retrieving a product  

Taking note of the `_id` from the previous request, execute the following `curl` command to retrieve the product:  

    curl -H "Authorization: Bearer Ym9zY236Ym9zY28=" localhost:8080/v1/product/581b6214f49e0c347657ae13  
    
Response:  

    {
      "success": true,
      "code": 200,
      "result": {
          "_id": "581b6214f49e0c347657ae13",
          "title": "Nike Shoes",
          "category": "shoes",
          "price": 100,
          "quantity": 4,
          "status": 5,
          "__v": 0
      }
    }  

### Updating a product  
### Deleting a product  

To delete the product, execute the following `curl` command:  

    curl -X DELETE -H "Authorization: Bearer Ym9zY236Ym9zY28=" localhost:8080/v1/product/581b6214f49e0c347657ae13  
    
Response:  

    {
      "success": true,
      "code": 200,
      "result": {
          "ok": 1,
          "n": 1
      }
    }
