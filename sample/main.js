import fs from 'fs';
import { taskPool, MTurk } from '../requester/src/main';
import tasks from './tasks';

// assignment algorithm should be compiled because it will be run by worker's browser
const assignmentProgram = fs.createReadStream('./assignment-dist/random.js');

const mturk = new MTurk({
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// set the tasks and assignment algorithm to task pool
taskPool.setTasks(tasks).then(res => {
  const { taskGroupId } = res;

  // create a HIT with taskGroupId and assignmentProgram
  mturk.createHIT(taskGroupId, assignmentProgram, {
    'Title': 'Estimate age of the photo',
    'MaxAssignment': 1,
    'Description': 'We will show you some photos. You should estimate the age of person who is in the photo.',
    'AssignmentDurationInSeconds': 30,
    'LifetimeInSeconds': 3600,
    'Reward.1.Amount': 0.02,
    'Reward.1.CurrencyCode': 'USD'
  });
}).catch(e => console.log(e));
