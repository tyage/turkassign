import fs from fs;
import { taskPooler, MTurk } from '../lib/main';

// set the tasks to task pooler
const tasks = [];
const taskSetId = taskPooler.setTasks(tasks);

// create a HIT with algorithm and taskSetId
const mturk = new MTurk({
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const algorithm = fs.readFileSync('./random.js');
const budget = 0.06;
const hitCost = 0.02;
for (let i = 0; i < budget / hitCost; ++i) {
  mturk.createHIT(algorithm, taskSetId, {
    'Reward.1.Amount': hitCost
  });
}
