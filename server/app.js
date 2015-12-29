import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import uuid from 'node-uuid';

const app = express();
const server = http.Server(app);

server.listen(process.env.PORT || 80);

app.use(bodyParser.json());
app.use('/static', express.static('public/dist'));
app.use('/algorithm', express.static('public/algorithm'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

const taskSets = [];

app.put('/set', (req, res) => {
  const id = uuid();

  const taskSet = req.body.taskSet;
  taskSets[id] = taskSet;
  console.log(`taskSet ${id} was set`);
  console.log(taskSet);

  const algorithm = req.body.algorithm;
  if (algorithm) {
    fs.writeFileSync(`./algorithm/${id}.js`, algorithm);
  }

  res.json({
    id
  });
});

app.post('/reserve', (req, res) => {
  const { taskSetId, index } = req.params;
  const task = taskSets[taskSetId][index];

  if (task.budget <= 0) {
    res.json({ error: `task ${index} run out of its budget` });
    return;
  }

  --task.budget;

  console.log(`task ${index} of taskSet ${taskSetId} was reserved`);

  res.json({
    task
  });
});

app.post('/unreserve', (req, res) => {
  const { taskSetId, index } = req.params;
  const task = taskSets[taskSetId][index];

  ++task.budget;

  console.log(`task ${index} of taskSet ${taskSetId} was unreserved`);

  res.json({
    task
  });
});

app.get('/list/:id', (req, res) => {
  const id = req.params.id;

  res.json({
    taskSet: taskSets[id]
  });
});
