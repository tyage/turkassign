import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import multer from 'multer';
import fs from 'fs';
import { createTaskGroup, getTasks, getTaskGroup } from './repositories/task';
import { createAssignment, finishAssignment } from './repositories/assignment';
import uuid from 'node-uuid';

const mult = multer({ dest: './uploads/' });
const app = express();
const server = http.Server(app);

server.listen(process.env.PORT || 80);

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static('public'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

/*
  PUT /upload
    file: uploaded file

  return:
    filename: filename of uploaded file
*/
const uploadForm = mult.fields([
  { name: 'file' },
]);
app.put('/upload', uploadForm, (req, res) => {
  const { file } = req.files;

  if (!file || file.length === 0) {
    res.json({ error: 'file to upload is not found' });
    return;
  }

  const fileId = uuid();
  const path = file[0].path;
  const filename = `public/uploads/${fileId}.js`;
  fs.rename(path, filename);
  res.json({
    filename
  });
});

/*
  PUT /set
    tasks: data of tasks

  return:
    taskGroupId: id of task group
*/
app.put('/set', (req, res) => {
  const { tasks } = req.body;
  const taskGroupId = createTaskGroup(JSON.parse(tasks));
  console.log(`taskGroup ${taskGroupId} was created`);
  console.log(tasks);

  res.json({
    taskGroupId
  });
});

/*
  POST /assign
    taskIds: list of id of tasks

  return:
    assignments: data of assignments
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
    assignments: data of assignments
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
    taskGroup: data of task group
*/
app.get('/list/:groupId', (req, res) => {
  const { groupId } = req.params;
  const taskGroup = getTaskGroup(groupId);

  res.json({
    taskGroup
  });
});
