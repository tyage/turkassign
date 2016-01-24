import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import multer from 'multer';
import fs from 'fs';
import { createTasks, getTasks } from './repositories/task';
import { createAssignment, finishAssignment } from './repositories/assignment';

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
  POST /assign
    taskIds: list of id of tasks

  return:
    assignments
*/
app.post('/assign', (req, res) => {
  const { taskIds } = req.body;
  const tasks = getTasks(taskIds);
  // TODO: get workerId from cookie
  const workerId = 1;

  // check if there is any task that runs out of its budget
  const noBudgetTask = tasks.find(task => {
    return task.budget <= 0;
  });
  if (noBudgetTask !== null) {
    res.json({ error: `task ${noBudgetTask.id} run out of its budget` });
    return;
  }

  const assignments = tasks.map(task => {
    return createAssignment(task.id, workerId);
  });
  console.log(`tasks ${taskIds.join(',')} was assigned to ${workerId}`);

  res.json({
    assignments
  });
});

/*
  POST /finish
    assignmentIds: list of id of assignments

  return:
    assignments
*/
app.post('/finish', (req, res) => {
  const { assignmentIds } = req.body;
  const tasks = getTasks(ids);
  // TODO: get workerId from cookie
  const workerId = 1;

  const assignments = assignmentIds.map(assignmentId => {
    return finishAssignment(assignmentId);
  });
  console.log(`assignments ${assignmentIds.join(',')} was finished by ${workerId}`);

  res.json({
    assignments
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
