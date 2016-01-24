import API from './api';
import { generateQuestionXML, questionTemplate } from './question';
import taskPooler from '../task-pooler';

class MTurk {
  constructor(apiParams) {
    this.api = new API(apiParams);
  }

  createHIT(taskGroupId, assignmentProgram, apiParams = {}) {
    const taskPoolerAddress = Config.get('taskPoolerAddress');
    taskPooler.uploadFile(assignmentProgram).then(res => {
      const { filename } = res;
      const assignmentProgramUrl = `${taskPoolerAddress}/${filename}`;

      const question = questionTemplate(taskGroupId, assignmentProgramUrl);
      const questionXML = generateQuestionXML(question);

      const params = Object.assign({
        Question: questionXML
      }, apiParams);
      return this.api.createHIT(params);
    });
  }
};

export default MTurk;
