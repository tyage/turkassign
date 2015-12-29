import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import uuid from 'node-uuid';
import multer from 'multer';

const mult = multer({ dest: './uploads/' });

const app = express();
const server = http.Server(app);

server.listen(process.env.PORT || 80);

app.use(bodyParser.json());
app.use('/static', express.static('public/dist'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

const taskSets = [];
const taskAlgorithms = {};

const formOnSet = mult.fields([
  { name: 'taskSet' },
  { name: 'algorithm' },
]);
app.put('/set', formOnSet, (req, res) => {
  const id = uuid();

  const taskSet = req.body.taskSet;
  taskSets[id] = JSON.parse(taskSet);
  console.log(`taskSet ${id} was set`);
  console.log(taskSet);

  const algorithm = req.files.algorithm;
  if (algorithm) {
    taskAlgorithms[id] = algorithm.path;
  }

  res.json({
    id
  });
});

app.get('/algorithm/:id.js', (req, res) => {
  const id = req.params.id;
  const content = fs.readFileSync(taskAlgorithms[id]);

  res.type('text/javascript');
  res.send(content);
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
