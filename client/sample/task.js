import { taskPooler, mturk } from '../lib/main';

// set the tasks to task pooler
const tasks = {};
const taskSetId = taskPooler.setTasks(tasks);

// create a HIT with algorithm and taskSetId
const algorithm = (worker, taskSet) => {
  // worker assigned a task which is choosed by algorithm
  // e.g. 乱択アルゴリズム
};

const budget = 0.06;
const hitCost = 0.02;
for (let i = 0; i < budget / hitCost; ++i) {
  mturk.createHIT(algorithm, taskSetId, {
    'Reward.1.Amount': hitCost
  });
}
