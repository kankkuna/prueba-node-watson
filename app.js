const AssistantV1 = require('watson-developer-cloud/assistant/v1');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// contenido estatico
app.use(express.static('public'));

const port = process.env.PORT || 3000;
const assistant = new AssistantV1({
  username: 'apikey',
  password: 'RDJCzTeukzpQxhi9yWriPzKuZs0Tbc3lUxkyttF6HxfG',
  url: 'https://gateway.watsonplatform.net/assistant/api',
  version: '2018-02-16',
});

app.post('/conversation/', (req, res) => {
  const { text, context = {} } = req.body;

  const params = {
    input: { text },
    workspace_id:'f86fba66-507a-4add-ba68-57ff8a5cff42',
    context,
  };

  assistant.message(params, (err, response) => {
    if (err) {
      console.error(err);
      res.status(500).json(err);
    } else {
      res.json(response);
    }
  });
});

app.listen(port, () => console.log(`Running on port ${port}`));

