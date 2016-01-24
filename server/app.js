import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import uuid from 'node-uuid';
import multer from 'multer';
import fs from 'fs';
import { createTasks, getTasks } from './task-repository';

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
  PUT /set
    taskSet: set of tasks
    algorithm: algorithm files

  return:
    id
*/
const formOnSet = mult.fields([
  { name: 'taskSet' },
  { name: 'algorithm' },
]);
// TODO: algorithmとtasksを分離
app.put('/set', formOnSet, (req, res) => {
  const tasks = req.body.tasks;
  const id = createTasks(JSON.parse(tasks));
  console.log(`taskSet ${id} was set`);
  console.log(tasks);

  const algorithm = req.files.algorithm;
  if (algorithm) {
    const path = algorithm[0].path;
    fs.rename(path, `./algorithm/${id}.js`);
  }

  res.json({
    id
  });
});

/*
  POST /reserve
    id: id of task set
    indexes: indexes of tasks

  return:
    current data of tasks
*/
app.post('/reserve', (req, res) => {
  const { id, indexes } = req.body;
  const tasks = getTasks(id);

  // check if there is any task that runs out of its budget
  const noBudgetTask = indexes.find(index => {
    const task = tasks[index];
    return task && task.budget <= 0;
  });
  if (noBudgetTask !== null) {
    res.json({ error: `task ${noBudgetTask} of ${id} run out of its budget` });
    return;
  }

  // TODO: call reserve function of repository and watch for limit times
  indexes.forEach(index => {
    const task = tasks[index];
    task && --task.budget;
  });
  console.log(`task ${indexes.join(',')} of ${id} was reserved`);

  res.json({
    tasks
  });
});

/*
  POST /unreserve
    id: id of task set
    indexes: indexes of tasks

  return:
    current data of tasks
*/
app.post('/unreserve', (req, res) => {
  const { id, indexes } = req.body;
  const tasks = getTasks(id);

  // TODO: call unreserve function of repository and watch for limit times
  indexes.forEach(index => {
    const task = tasks[index];
    task && ++task.budget;
  });

  console.log(`task ${indexes.join(',')} of ${id} was unreserved`);

  res.json({
    tasks
  });
});

/*
  GET /list/:id
    id: id of task set

  return:
    current data of tasks
*/
app.get('/list/:id', (req, res) => {
  const id = req.params.id;
  const tasks = getTasks(id);

  res.json({
    tasks
  });
});
