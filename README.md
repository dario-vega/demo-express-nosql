# demo-express-nosql

## Deployment
1. Clone this repository

````
sudo yum install git
git clone https://github.com/dario-vega/demo-express-nosql.git
````

2. Create the table

````
cd ~/demo-express-nosql/express-nosql
kv_admin ddl.sql
````

3. Edit and change the createClient() function if needed
4. Run

````
cd ~/demo-express-nosql/express-nosql
npm install
node express_oracle_nosql.js
````

## Deployment using docker

````
docker build -t express-nosql .
docker run -p 3000:3000  express-nosql 
````

## TEST

1. USE CURL

````
curl -X POST -d '{"id": -1, "blog": "Creating an empty blog from Node.js"}' -H 'content-type: application/json' localhost:3000
curl -X POST -d '{"blog": "Creating an empty blog from Node.js"}' -H 'content-type: application/json' localhost:3000
curl -X GET http://localhost:3000/1005
curl -X DELETE http://localhost:3000/1005
curl -X GET http://localhost:3000/
````

3. USE POSTMAN


