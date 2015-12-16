import fs from 'fs';
import { taskPooler, MTurk } from '../lib/main';

// set the tasks to task pooler
const tasks = [];
const taskSetId = taskPooler.setTasks(tasks);

// create a HIT with algorithm and taskSetId
const mturk = new MTurk({
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// assignment algorithm should be compiled because it will be run by worker's browser
const algorithm = fs.readFileSync('./assignment-dist/random.js');

const budget = 0.04;
const hitCost = 0.02;
for (let i = 0; i < budget / hitCost; ++i) {
  mturk.createHIT(algorithm, taskSetId, {
    'Reward.1.Amount': hitCost
  });
}
