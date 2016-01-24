import fs from 'fs';
import { taskPooler, MTurk } from '../requester-helper/src/main';
import tasks from './tasks';

// assignment algorithm should be compiled because it will be run by worker's browser
const algorithm = fs.createReadStream('./assignment-dist/random.js');

// set the tasks and assignment algorithm to task pooler
taskPooler.setTasksAndAlgorithm(tasks, algorithm).then(res => {
  const taskSetId = res.id;

  // create a HIT with taskSetId information
  const mturk = new MTurk({
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });

  const budget = 0.02;
  const hitCost = 0.02;
  for (let i = 0; i < budget / hitCost; ++i) {
    mturk.createHIT(taskSetId, {
      'Title': 'Estimate age of the photo',
      'Description': 'We will show you some photos. You should estimate the age of person who is in the photo.',
      'AssignmentDurationInSeconds': 30,
      'LifetimeInSeconds': 3600,
      'Reward.1.Amount': hitCost,
      'Reward.1.CurrencyCode': 'USD'
    });
  }
}).catch(e => console.log(e));
