var express = require('express');
const NoSQLClient = require('oracle-nosqldb').NoSQLClient;
const ServiceType = require('oracle-nosqldb').ServiceType;
const bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());


// Create a new blog
app.post('/', async (req, res) => {
    try {
        const result = await client.put("BlogTable", req.body );
        res.json({ result: result});
    } catch (err) {
        console.error('failed to insert data', err);
        res.status(500).json({ error: err });
    }
});

// Get a blog by id
app.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await client.get("BlogTable", { id })
        res.json(result.row);
    } catch (err) {
        console.error('failed to get data', err);
        res.status(500).json({ error: err });
    }
});

// Delete a blog
app.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await client.delete("BlogTable", { id });
        res.json({ result: result});
    } catch (err) {
        console.error('failed to delete data', err);
        res.status(500).json({ error: err });
    }
});

// Get all blog
app.get('/', async function (req, resW) {
    let statement = `SELECT * FROM blogtable`;
    const rows = [];

    try {
      let cnt ;
      let res;
      do {
         res = await client.query(statement, { continuationKey:cnt});
         rows.push.apply(rows, res.rows);
         cnt = res.continuationKey;
      } while(res.continuationKey != null);
      resW.send(rows)
    } catch (err){
        console.error('failed to select data', err);
        resW.sendStatus(500).json({ error: err });
    } finally {
    }
  });

  app.listen(3000);
  client = createClient();
  console.log('Application running!');

function createClient() {
  return new NoSQLClient({
            serviceType: ServiceType.KVSTORE,
            endpoint: 'proxy-nosql:80'
        });

}
