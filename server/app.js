import express from 'express';
import http from 'http';

const app = express();
const server = http.Server(app);

server.listen(process.env.PORT || 80);

app.use('/static', express.static('public/dist'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

const taskSets = [];

app.put('/set', (req, res) => {
  const id = Math.random();
  const taskSet = JSON.parse(req.body);
  taskSets[id] = taskSet;
  res.json({
    id
  });
});

app.post('/reserve', (req, res) => {
});

app.post('/unreserve', (req, res) => {

});

app.get('/list/:id', (req, res) => {
  const id = req.params.id;
  res.json({
    taskSet: taskSets[id]
  });
});
