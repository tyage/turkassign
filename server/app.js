import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import uuid from 'node-uuid';
import multer from 'multer';
import fs from 'fs';

const mult = multer({ dest: './uploads/' });
const app = express();
const server = http.Server(app);

server.listen(process.env.PORT || 80);

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/static', express.static('public/dist'));
app.use('/algorithm', express.static('algorithm'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

/*
taskSets = {
  taskSetId: [
    { task1 },
    { task2 },
  ]
}

task = {
  data: task data,
  budget: remaining budget,
}
*/
const taskSets = {};

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
    const path = algorithm[0].path;
    fs.rename(path, `./algorithm/${id}.js`);
  }

  res.json({
    id
  });
});

app.post('/reserve', (req, res) => {
  const { taskSetId, index } = req.body;
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
  const { taskSetId, index } = req.body;
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
