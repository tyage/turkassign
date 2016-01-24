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
    tasks: data of tasks
    algorithm: algorithm files

  return:
    id of task group
*/
const formOnSet = mult.fields([
  { name: 'tasks' },
  { name: 'algorithm' },
]);
// TODO: algorithmとtasksを分離
app.put('/set', formOnSet, (req, res) => {
  const { tasks } = req.body;
  const groupId = createTaskGroup(JSON.parse(tasks));
  console.log(`taskGroup ${groupId} was created`);
  console.log(tasks);

  const { algorithm } = req.files;
  if (algorithm) {
    const path = algorithm[0].path;
    fs.rename(path, `./algorithm/${id}.js`);
  }

  res.json({
    groupId
  });
});

/*
  POST /reserve
    ids: list of id of tasks

  return:
    tasks
*/
app.post('/reserve', (req, res) => {
  const { ids } = req.body;
  const tasks = getTasks(ids);

  // check if there is any task that runs out of its budget
  const noBudgetTask = tasks.find(task => {
    return task.budget <= 0;
  });
  if (noBudgetTask !== null) {
    res.json({ error: `task ${noBudgetTask.id} run out of its budget` });
    return;
  }

  // TODO: call reserve function of repository and watch for limit times
  tasks.forEach(task => {
    --task.budget;
  });
  console.log(`tasks ${ids.join(',')} was reserved`);

  res.json({
    tasks
  });
});

/*
  POST /unreserve
    ids: list of id of tasks

  return:
    tasks
*/
app.post('/unreserve', (req, res) => {
  const { ids } = req.body;
  const tasks = getTasks(ids);

  // TODO: call unreserve function of repository and watch for limit times
  tasks.forEach(task => {
    ++task.budget;
  });

  console.log(`task ${ids.join(',')} was unreserved`);

  res.json({
    tasks
  });
});

/*
  GET /list/:groupId
    groupId: id of task group

  return:
    task group
*/
app.get('/list/:groupId', (req, res) => {
  const { groupId } = req.params;
  const taskGroup = getTaskGroup(groupId);

  res.json({
    taskGroup
  });
});
