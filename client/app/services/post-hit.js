import stream from 'stream';
import { taskPool, MTurk, config } from '../../../requester/src/main';
import fs from 'fs';

// post hit with current config
const postHIT = (setting) => {
  const mturk = new MTurk({
    awsAccessKeyId: setting.awsAccessKeyId,
    awsSecretAccessKey: setting.awsSecretAccessKey,
    endpoint: setting.mturkEndpoint
  });

  config.set('taskPoolAddress', setting.taskPoolAddress);

  return taskPool.setTasks(setting.tasks).then(res => {
    const { taskGroupId } = res;

    // create stream from text
    const turkassignBrowser = fs.readFileSync('./node_modules/turkassign-browser/lib/main-packed.js');
    const uploadedFile = './tmp/upload.js';
    fs.writeFileSync(uploadedFile, turkassignBrowser + setting.algorithm);

    return mturk.createHIT(taskGroupId, fs.createReadStream(uploadedFile), {
      'Title': 'Estimate age of the photo',
      'MaxAssignment': 1,
      'Description': 'We will show you some photos. You should estimate the age of person who is in the photo.',
      'AssignmentDurationInSeconds': 30,
      'LifetimeInSeconds': 3600,
      'Reward.1.Amount': 0.02,
      'Reward.1.CurrencyCode': 'USD'
    }).then(hitResult => {
      return {
        hitResult,
        taskGroupId
      };
    });
  });
};

export default postHIT;
