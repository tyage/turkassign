import API from './api';
import { generateQuestionXML, defaultQuestion } from './question';

class MTurk {
  constructor(apiParams) {
    this.api = new API(apiParams);
  }

  createHIT(algorithm, taskSetId, apiParams = {}) {
    const params = Object.assign({
      Question: generateQuestionXML(defaultQuestion(algorithm, taskSetId)),
      MaxAssignments: 1,
      Title: 'sample HIT ' + new Date(), // XXX: this is sample
      Description: 'sample desc', // XXX: this is sample
      AssignmentDurationInSeconds: 30, // XXX: this is sample
      LifetimeInSeconds: 3600, // XXX: this is sample
      'Reward.1.Amount': 0.32, // XXX: this is sample
      'Reward.1.CurrencyCode': 'USD' // XXX: this is sample
    }, apiParams);
    this.api.createHIT(params);
  }
};

export default MTurk;
