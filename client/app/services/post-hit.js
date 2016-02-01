import stream from 'stream';
import { taskPool, MTurk, config } from '../../../requester/src/main';

// post hit with current config
const postHIT = (config) => {
  const mturk = new MTurk({
    awsAccessKeyId: config.awsAccessKeyId,
    awsSecretAccessKey: config.awsSecretAccessKey
  });
  return taskPool.setTasks(config.tasks).then(res => {
    const { taskGroupId } = res;

    // create stream from text
    // http://stackoverflow.com/questions/12755997/how-to-create-streams-from-string-in-node-js
    const assignmentProgram = new stream.Readable();
    assignmentProgram._read = () => {};
    assignmentProgram.push(config.assignmentProgram);
    assignmentProgram.push(null);

    return mturk.createHIT(taskGroupId, assignmentProgram, {
      'Title': 'Estimate age of the photo',
      'MaxAssignment': 1,
      'Description': 'We will show you some photos. You should estimate the age of person who is in the photo.',
      'AssignmentDurationInSeconds': 30,
      'LifetimeInSeconds': 3600,
      'Reward.1.Amount': 0.02,
      'Reward.1.CurrencyCode': 'USD'
    });
  });
};

export default postHIT;
